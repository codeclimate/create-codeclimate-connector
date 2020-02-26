module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  //testMatch: ["/src/__tests__/**/*.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/tmpl/"],
  globals: {
    "ts-jest": {
      diagnostics: true
    }
  }
};
