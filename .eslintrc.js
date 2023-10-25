module.exports = {
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    // "quotes": [
    //   "error",
    //   "double"
    // ],
    "semi": [
      "error",
      "always"
    ],
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/display-name": 0,
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};
