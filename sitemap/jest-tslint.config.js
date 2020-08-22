module.exports = {
  displayName: "lint:tslint",
  moduleFileExtensions: ["ts", "js"],
  runner: "jest-runner-tslint",
  testMatch: ["**/*.ts", "**/*.js"],
  testPathIgnorePatterns: ["/node_modules/", "/coverage/", "README.md"]
};
