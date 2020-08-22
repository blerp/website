module.exports = {
    displayName: "specs",
    collectCoverage: true,
    coverageDirectory: "./coverage/",
    coveragePathIgnorePatterns: ["/node_modules/", "/.jest/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testPathIgnorePatterns: [
        "/src/pages/_document.tsx",
        "/node_modules/",
        "/cypress/",
        "/coverage/",
        "/sitemap/",
        "/dist/",
        "/.next/",
        "/out/",
    ],
    testRegex: "(/(.|__)tests(__)?/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
};
