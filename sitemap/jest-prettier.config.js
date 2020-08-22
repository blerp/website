module.exports = {
  displayName: "lint:prettier",
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "ts",
    "tsx",
    "css",
    "less",
    "scss",
    "graphql",
    "md",
    "markdown"
  ],
  runner: "jest-runner-prettier",
  testMatch: [
    "**/*.js",
    "**/*.jsx",
    "**/*.json",
    "**/*.ts",
    "**/*.tsx",
    "**/*.css",
    "**/*.less",
    "**/*.scss",
    "**/*.graphql",
    "**/*.md",
    "**/*.markdown"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/coverage/", "README.md"]
};
