module.exports = {
  extends: ['./configs/default', './configs/typescript', './configs/react'],
  plugins: ['react-native'],
  env: { 'react-native/react-native': true },
  rules: {
    'react-native/no-inline-styles': ['warn'],
    'react-native/no-unused-styles': ['error']
  }
};
