module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
      "react-app",
      "eslint:recommended",
      "prettier",
      "prettier/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
          "warn",
          { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
        ],
        "no-console": "warn"
    }
};
