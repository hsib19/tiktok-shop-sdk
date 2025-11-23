import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@modules$": "<rootDir>/src/modules/index.ts",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@sdk$": "<rootDir>/src/sdk/index.ts",
    "^@sdk/(.*)$": "<rootDir>/src/sdk/$1",
    "^@client$": "<rootDir>/src/client/index.ts",
    "^@client/(.*)$": "<rootDir>/src/client/$1",
    "^@types$": "<rootDir>/src/types/index.ts",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@utils$": "<rootDir>/src/utils/index.ts",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  watchman: false,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: ["src/types/"],
  testPathIgnorePatterns: ["/dist/"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
};

export default config;
