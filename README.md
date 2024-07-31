# ESLint Config

Configuração padrão do eslint para os projetos da Eduzz.

## Instalação

```sh
yarn add --dev @eduzz/eslint-config
```

1. `eslint.config.js`
```js
const { ignores, configs } = require('@eduzz/eslint-config'); // Javascript / Typescript / Node
const { ignores, configs } = require('@eduzz/eslint-config/react'); // React
const { ignores, configs } = require('@eduzz/eslint-config/react-native'); // React Native

/** @type import('eslint').Linter.Config[] */
module.exports = [...configs, { ignores: ignores() }];
```
2. `.prettierrc.js`
```js
module.exports = {
  ...require('@eduzz/eslint-config/.prettierrc')
};
```

## Configurações Extras

### Ignore

Por padrão todos os arquivos do `.gitignore` já são removidos, caso queira adicionar mais:

```js
/** @type import('eslint').Linter.Config[] */
module.exports = [...configs, { ignores: ignores('**/ignore/**.js', 'ignore.js') }];
```

### Custom Rules

Caso queira adicionar/remover alguma rule basta adicionar `rules` na última config:
```js
/** @type import('eslint').Linter.Config[] */
module.exports = [
  ...configs, 
  {
    ignores: ignores(),
    rules: {
      '@typescript-eslint/no-unused-vars': ['off']
    }
  }
];
```


### VSCode

- Adicione a extensão do [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
  **SUGERIMOS DESISTALAR OU DESATIVAR A EXTENSÃO DO PRETTIER POIS O ESLINT QUE APLICARÁ O PRETTIER.**

- Crie/Adicione no .vscode/settings.json (não na suas configurações, pois assim ficará no projeto e o time já terá acesso):

```json
{
  //... suas configurações
  "editor.codeActionsOnSave": {
    "source.organizeImports": false,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.formatOnPaste": false,
  "editor.formatOnSave": false,
  "editor.formatOnType": false,
  "editor.tabSize": 2
}
```
