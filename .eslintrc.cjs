module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['react-compiler'],
  rules: {
    'no-console': 'error',
    'react-compiler/react-compiler': 'error',
  },
};
