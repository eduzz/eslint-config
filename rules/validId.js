const isInvalidId = text => {
  return !/^[A-Za-z][\w-:.]*$/.test(text);
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

        const isJsxExpressionLiteralIdEmpty =
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'Literal' &&
          node.value.expression.value === '';

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
          node.value.expression.expressions.length === 1 &&
          !Boolean(node.value.expression.expressions[0].value) &&
          'value' in node.value.expression.expressions[0];

        if (isJsxExpressionTemplateLiteralIdEmpty) {
          context.report({
            node,
            message: NO_EMPTY_ID_MESSAGE
          });
          return;
        }

        const isLiteralIdEmpty = node.value.type === 'Literal' && node.value.value === '';

        if (isLiteralIdEmpty) {
          context.report({
            node,
            message: NO_EMPTY_ID_MESSAGE
          });
          return;
        }

        if (isInvalidId(node.value.value)) {
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
