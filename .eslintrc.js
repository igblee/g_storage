module.exports = {
  "env": { "browser": false, "es6": true, "node": true },
  "extends": [
    "standard",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    parser: 'babel-eslint',
    "ecmaFeatures": {
      "legacyDecorators": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": 'off',
    "no-return-await": "off",
    "max-len": ["error", { "ignoreComments": true, "code": 140 }]
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "extends": [
        "standard",
        "plugin:@typescript-eslint/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        parser: 'babel-eslint',
        "ecmaFeatures": { "jsx": true },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint"],
      "rules": {
        'no-new': 'off',
        "@typescript-eslint/no-explicit-any": 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "@typescript-eslint/interface-name-prefix": 'off',
        "@typescript-eslint/member-delimiter-style": 'off',
      },
    }
  ]
}