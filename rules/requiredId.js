const MUST_HAVE_ID_MESSAGE = '⚠️  Elemento deve ter um id, adicione um id e ajude os Analistas de Teste =]';

const isImportSourceSupported = source => /(^antd*)/.test(source);
const isSpecifierCheckable = specifier =>
  /(^Input$|^Button$|^Select$|^InputNumber$|^Slider$|^Switch$|^Checkbox$)/.test(specifier);

const isDefaultImportSourceSupported = source =>
  [
    'antd/lib/input',
    'antd/es/input/Input',
    'antd/lib/input/Input',
    'antd/lib/button',
    'antd/lib/button/button',
    'antd/lib/button/Button',
    'antd/lib/select',
    'antd/lib/input-number',
    'antd/lib/slider',
    'antd/lib/switch',
    'antd/lib/checkbox',
    'antd/es/checkbox/Checkbox',
    'antd/lib/checkbox/Checkbox'
  ].includes(source);

const excludeNestedComponentsNameList = [['Checkbox', 'Group']];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure that elements have an id',
      recommended: false
    }
  },
  create: context => {
    let components = ['input', 'button', 'select', 'a', 'textarea', 'option'];

    return {
      ImportDeclaration(node) {
        if (!isImportSourceSupported(node.source.value)) {
          return;
        }

        if (!Boolean(node.specifiers.length)) {
          return;
        }

        const imports = node.specifiers
          .filter(({ type, imported }) => {
            if (type !== 'ImportSpecifier') {
              return false;
            }

            if (!isSpecifierCheckable(imported.name)) {
              return false;
            }

            return true;
          })
          .map(specifier => specifier.local.name);

        const defaultImports = node.specifiers
          .filter(({ type }) => {
            if (type !== 'ImportDefaultSpecifier') {
              return false;
            }

            if (!isDefaultImportSourceSupported(node.source.value)) {
              return false;
            }

            return true;
          })
          .map(specifier => specifier.local.name);

        components = [...components, ...imports, ...defaultImports];
      },
      JSXOpeningElement(node) {
        if (!node.name) {
          return;
        }

        if (node.name.type === 'JSXIdentifier' && !components.includes(node.name.name)) {
          return;
        }

        if (node.name.type === 'JSXMemberExpression' && !components.includes(node.name.object.name)) {
          return;
        }

        if (
          node.name.type === 'JSXMemberExpression' &&
          excludeNestedComponentsNameList.includes([node.name.object.name, node.name.property.name])
        ) {
          return;
        }

        const [id] = node.attributes.filter(({ name }) => {
          if (!name) {
            return false;
          }

          return name.name === 'id';
        });

        if (!id) {
          context.report({
            node,
            message: MUST_HAVE_ID_MESSAGE
          });
          return;
        }
      }
    };
  }
};
