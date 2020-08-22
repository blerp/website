module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
        "jest/globals": true,
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react", "prettier", "jest"],
    extends: [
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier",
        "prettier/react",
    ],
    rules: {
        // https://stackoverflow.com/questions/29972396/how-can-i-customize-the-tab-to-space-conversion-factor
        "react/jsx-filename-extension": [1, { extensions: ["js", "jsx"] }],
        "import/extensions": 0,
        "react/prop-types": 0,
        "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
        "prettier/prettier": "error",
        "react/no-unescaped-entities": 0,
        "react/no-find-dom-node": 0,

        "import/no-named-as-default": 0,
        "react/no-find-dom-node": 0,
        "react/display-name": 0,
    },
    settings: {
        "import/resolver": {
            node: {
                paths: ["~"],
            },
        },
    },
};
