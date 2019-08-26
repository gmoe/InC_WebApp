module.exports = {
  env: { browser: true },
  parser: 'babel-eslint',
  plugins: [
    'import',
    'jsx-a11y',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    /** Hyperapp fixes. */
    'react/display-name': 'off',
    'react/no-unknown-property': 'off',
  },
  settings: {
    react: {
      /** Hyperapp syntax. */
      pragma: 'h',
      /** Interested in JSX rules, not React. */
      version: '999.999.999',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
