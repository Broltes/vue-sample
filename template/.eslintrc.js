module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/config.js'
      }
    }
  },
  rules: {
    'func-names': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }]
  }
};
