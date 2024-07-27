import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/test/ut"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^vscode$": "<rootDir>/__mocks__/vscode.ts",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: false, // Optional: to speed up tests by skipping type checking during tests
    },
  },
};

export default config;
