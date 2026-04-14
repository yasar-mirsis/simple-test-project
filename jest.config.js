{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "roots": ["<rootDir>/tests"],
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": ["**/tests/**/*.test.ts"],
  "collectCoverageFrom": ["src/**/*.ts", "!src/**/*.d.ts"],
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "lcov", "html"]
}
