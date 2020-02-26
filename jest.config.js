module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["src/__tests__/**/*.ts"],
  globals: {
    "ts-jest": {
      diagnostics: true
    }
  }
};
