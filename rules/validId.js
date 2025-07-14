const isIdMalformed = text => {
  return !/^[A-Za-z][\w-:.]*$/.test(text);
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

const INVALID_ID_MESSAGE =
  'O id está em um formato inválido, espera-se que o id:\n- deve começar com uma letra\n- pode conter (-, _, :, .)\n- não pode conter espaços ou caracteres especiais';
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
