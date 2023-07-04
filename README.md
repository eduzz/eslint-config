# ESLint Config

Para configurar no padrão da Eduzz, primerio você deve adicionar as dependências, pois o eslint exige que plugins devem,
ser adicionados no projeto principal:

## React

```sh
yarn add --dev eslint @eduzz/eslint-config eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unused-imports prettier
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

## React Native:

```sh
yarn add --dev eslint @eduzz/eslint-config eslint eslint-plugin-react-native @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-unused-imports prettier
```

```js
// .eslintrc
{
  "extends": ["@eduzz/eslint-config/native"]
}

// .prettierrc.js
module.exports = {
  ...require('@eduzz/eslint-config/.prettierrc')
};
```

## Node

```sh
yarn add --dev eslint @eduzz/eslint-config eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-unused-imports prettier
```

```js
// .eslintrc
{
  "extends": ["@eduzz/eslint-config/node"]
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

### React 17 e JSX

Para utilizar a nova versão do React com jsx-runtime basta seguir o [tutorial do blog](https://pt-br.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html),
mas resumidamente é:

```bash
# Removendo Imports React não Utilizadas
npx react-codemod update-react-imports
```

tsconfig.json

```json
{
  //... suas configurações
  "compilerOptions": {
    "jsx": "react-jsx" //Troque esse configuração
  }
}
```

.eslintrc

```json
{
  "extends": ["@eduzz/eslint-config"],
  "rules": {
    //Adicione essas rules
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```
