const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalDecorators: true,
      experimentalObjectRestSpread: true,
      jsx: true,
      classes: true,
    },
    sourceType: 'module',
    babelOptions: {
      configFile: path.join(__dirname, '.babelrc.js'),
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    ga: true,
    window: true,
    document: true,
    navigator: true,
    graphql: false,
    __VERSION__: true,
    __ENV__: true,
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'func-names': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': 0,
    'max-len': 0,
    'no-bitwise': 0,
    'no-console': 0,
    'no-nested-ternary': 1,
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'no-underscore-dangle': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'object-curly-newline': [0],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'prefer-destructuring': ['error', {
      array: false,
      object: true,
    }],

    'import/prefer-default-export': 0,

    // react
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-fragments': [1],
    'react/jsx-key': 1,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-array-index-key': 1, // warning for now, don't know how to fix
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/react-in-jsx-scope': 'off',
    'react/sort-comp': 0,
    // jsx-a11y
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
  settings: {
    'import/resolver': {
      alias: [
        ['site', path.resolve(__dirname, './src')],
      ],
    },
  },
}
