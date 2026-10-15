const isIdMalformed = text => {
  return !/^[A-Za-z][\w-:.]*$/.test(text);
};

const isStaticFragmentMalformed = text => {
  return !/^[\w-:.]*$/.test(text);
};

const extractAttributeValue = node => {
  if (!node.value || !node.value.type) {
    return '';
  }

  if (node.value.type === 'Literal') {
    return node.value.value;
  }

  if (node.value.expression.type === 'Literal') {
    return node.value.expression.value;
  }

  if (node.value.expression.type === 'TemplateLiteral') {
    return node.value.expression.quasis.map(({ value }) => value.cooked).join('');
  }

  return '';
};

const getTemplateLiteralExpression = node => {
  if (!node.value || node.value.type !== 'JSXExpressionContainer' || node.value.expression.type !== 'TemplateLiteral') {
    return null;
  }

  return node.value.expression;
};

const isDynamicTemplateLiteral = templateLiteral => {
  return templateLiteral.expressions.length > 0;
};

const isDynamicTemplateLiteralMalformed = templateLiteral => {
  const quasis = templateLiteral.quasis.map(({ value }) => (value.cooked != null ? value.cooked : ''));

  if (quasis.some(isStaticFragmentMalformed)) {
    return true;
  }

  const startsWithInterpolation = quasis[0] === '';

  if (!startsWithInterpolation && !/^[A-Za-z]/.test(quasis[0])) {
    return true;
  }

  return false;
};

const INVALID_ID_MESSAGE = [
  'Id inválido. Formato aceito:',
  '- começa com letra (A-Z ou a-z)',
  '- depois só letras, dígitos, -, _, : ou .',
  '- variável: id={name}',
  '- chamada: id={getId(...)}',
  '- template: id={`prefix-${name}`} ou id={`${name}-suffix`}',
  '- partes estáticas do template devem seguir o mesmo formato',
  '- não aceito: espaços, acentos ou outros caracteres especiais'
].join('\n');
const REPEATED_ID_MESSAGE = 'Você já esta utilizando este id em outro elemento =]';
const NO_EMPTY_ID_MESSAGE = 'O id não pode ser vazio =]';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure that ids are valid',
      recommended: false
    }
  },
  create: context => {
    const ids = new Set();

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'id') {
          return;
        }

        const isJsxExpressionValueVariable =
          node.value.type === 'JSXExpressionContainer' &&
          (node.value.expression.type === 'Identifier' ||
            node.value.expression.type === 'MemberExpression' ||
            node.value.expression.type === 'CallExpression' ||
            node.value.expression.type === 'ObjectExpression' ||
            node.value.expression.type === 'ArrayExpression');

        if (isJsxExpressionValueVariable) {
          return;
        }

        const isJsxExpressionLiteralIdEmpty =
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'Literal' &&
          node.value.expression.value.trim() === '';

        if (isJsxExpressionLiteralIdEmpty) {
          context.report({
            node,
            message: NO_EMPTY_ID_MESSAGE
          });
          return;
        }

        const isJsxExpressionTemplateLiteralIdEmpty =
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'TemplateLiteral' &&
          node.value.expression.quasis.length === 1 &&
          'value' in node.value.expression.quasis[0] &&
          !Boolean(node.value.expression.quasis[0].value.cooked.trim());

        if (isJsxExpressionTemplateLiteralIdEmpty) {
          context.report({
            node,
            message: NO_EMPTY_ID_MESSAGE
          });
          return;
        }

        const isLiteralIdEmpty = node.value.type === 'Literal' && node.value.value.trim() === '';

        if (isLiteralIdEmpty) {
          context.report({
            node,
            message: NO_EMPTY_ID_MESSAGE
          });
          return;
        }

        const templateLiteral = getTemplateLiteralExpression(node);

        if (
          templateLiteral &&
          isDynamicTemplateLiteral(templateLiteral) &&
          isDynamicTemplateLiteralMalformed(templateLiteral)
        ) {
          context.report({
            node,
            message: INVALID_ID_MESSAGE
          });
          return;
        }

        if (templateLiteral && isDynamicTemplateLiteral(templateLiteral)) {
          return;
        }

        const value = extractAttributeValue(node);

        if (isIdMalformed(value)) {
          context.report({
            node,
            message: INVALID_ID_MESSAGE
          });
          return;
        }

        if (ids.has(node.value.value)) {
          context.report({
            node,
            message: REPEATED_ID_MESSAGE
          });
          return;
        }

        if (node.value.type !== 'Literal') {
          return;
        }

        ids.add(node.value.value);
      }
    };
  }
};
