# ESLint Config

Configuração padrão do eslint para os projetos da Eduzz.

## Migração

Se está migrando do `@eduzz/eslint-config-houston` altere as configurações do .eslintrc para:

* `@eduzz/eslint-config-houston` >> `@eduzz/eslint-config/react`
* `@eduzz/eslint-config-houston/native` >> `@eduzz/eslint-config/react-native`
* `@eduzz/eslint-config-houston/node` >> `@eduzz/eslint-config`

## Instalação

Para configurar no padrão da Eduzz, primerio você deve adicionar as dependências, pois o eslint exige que plugins devem,
ser adicionados no projeto principal

### Javascript / Typescript / Node

```sh
yarn add --dev @eduzz/eslint-config eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-unused-imports prettier
```

```js
// .eslintrc
{
  "extends": ["@eduzz/eslint-config"]
}

// .prettierrc.js
module.exports = {
  ...require('@eduzz/eslint-config/.prettierrc')
};
```

### React

```sh
yarn add --dev @eduzz/eslint-config eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unused-imports prettier
```

```js
// .eslintrc
{
  "extends": ["@eduzz/eslint-config/react"]
}

// .prettierrc.js
module.exports = {
  ...require('@eduzz/eslint-config/.prettierrc')
};
```

### React Native

```sh
yarn add --dev @eduzz/eslint-config eslint eslint-plugin-react-native @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unused-imports prettier
```

```js
// .eslintrc
{
  "extends": ["@eduzz/eslint-config/react-native"]
}

// .prettierrc.js
module.exports = {
  ...require('@eduzz/eslint-config/.prettierrc')
};
```

## Configurações Extras

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
