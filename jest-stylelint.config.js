module.exports = {
    displayName: "lint:stylelint",
    moduleFileExtensions: ["css", "js", "jsx", "tsx"],
    runner: "jest-runner-stylelint",
    rules: {
        "order/properties-alphabetical-order": null,
    },
    testMatch: ["**/*.css", "**/*.js", "**/*.jsx", "**/*.tsx"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/coverage/",
        "/sitemap/",
        "/dist/",
        "/.next/",
        "/out/",
        "/src/pages/_document.tsx",
        "/src/components/audio-button.tsx",
        "/src/components/upload-link-controller.tsx",
        "README.md",
    ],
};
