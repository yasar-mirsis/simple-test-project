## Overview

This plan defines the implementation of a minimal Express.js + TypeScript REST API with a single GET /hello endpoint. The project requires setting up the development environment with TypeScript and Express, creating a configuration module for environment variables, implementing the server entry point with graceful shutdown handling, and defining the /hello route that returns a JSON greeting. The implementation follows a clean separation of concerns with distinct modules for configuration, routing, and server management.

## Tasks

### 1. Project Initialization and TypeScript Configuration
**Description:** Set up the Node.js project structure with package.json containing Express.js dependencies and TypeScript configuration. Initialize the project with npm, add Express and TypeScript dependencies, and configure the build pipeline.

The package.json must include:
- name: "simple-test-project"
- version: "1.0.0"
- main: "dist/index.js"
- scripts: "start", "build", "dev"
- dependencies: "express": "^4.18.2"
- devDependencies: "typescript": "^5.3.0", "@types/express": "^4.17.21", "@types/node": "^20.10.0", "ts-node": "^10.9.1"

The tsconfig.json must include:
- target: "ES2020"
- module: "commonjs"
- outDir: "./dist"
- rootDir: "./src"
- strict: true
- esModuleInterop: true
- skipLibCheck: true
- forceConsistentCasingInFileNames: true
- resolveJsonModule: true

**Files to create:**
- package.json
- tsconfig.json
- .gitignore

**Files to modify:**
None

**Complexity:** Low

**Dependencies:** None

### 2. Type Definitions Module
**Description:** Create a types module to define TypeScript interfaces for API responses and configuration. This provides type safety across the application.

Define the following interfaces:
- `HelloResponse`: interface with `message: string` property
- `Config`: interface with `port: number` and `nodeEnv: string` properties

Place these in a dedicated types file that can be imported by other modules.

**Files to create:**
- src/types/index.ts

**Files to modify:**
None

**Complexity:** Low

**Dependencies:** None

### 3. Configuration Module
**Description:** Implement the configuration module that reads and validates environment variables. This module provides typed access to configuration values throughout the application.

Create a config module with:
- `config.port`: number - Server port from PORT env var, default 3000
- `config.nodeEnv`: string - Node environment from NODE_ENV, defaults to "development"

The module should export a configuration object with these properties. Use process.env to read values and provide sensible defaults.

**Files to create:**
- src/config/index.ts

**Files to modify:**
None

**Complexity:** Low

**Dependencies:** None

### 4. Hello Route Implementation
**Description:** Implement the /hello route handler that responds to GET requests with a JSON greeting message.

Create a route module that:
- Exports a `setupHelloRoute(app: Express): void` function
- Registers a GET route at path `/hello`
- Returns HTTP 200 with response body `{"message": "Hello, World!"}`
- Sets Content-Type header to application/json

The route should use the HelloResponse type for type safety.

**Files to create:**
- src/routes/hello.ts

**Files to modify:**
None

**Complexity:** Low

**Dependencies:** 2 (types module)

### 5. Server Entry Point
**Description:** Create the main server entry point that initializes Express, sets up routes, and starts the HTTP server with graceful shutdown handling.

The server module must:
- Create an Express application instance
- Import and call setupHelloRoute to register routes
- Listen on the port from config
- Log startup message with the port number
- Handle SIGTERM and SIGINT signals for graceful shutdown
- Close the HTTP server when shutdown is requested
- Export start() and stop() functions for the configuration module to use

**Files to create:**
- src/index.ts

**Files to modify:**
None

**Complexity:** Medium

**Dependencies:** 2 (types), 3 (config), 4 (routes)

### 6. Unit Tests for Configuration Module
**Description:** Create unit tests for the configuration module to verify environment variable handling and default values.

Test cases:
- Default port is 3000 when PORT is not set
- Custom port is used when PORT environment variable is set
- Default nodeEnv is "development" when NODE_ENV is not set
- Custom nodeEnv is used when NODE_ENV environment variable is set

Use Jest as the testing framework with basic test structure.

**Files to create:**
- tests/config.test.ts

**Files to modify:**
- package.json (add test script)

**Complexity:** Low

**Dependencies:** 3 (config module must exist first)

### 7. Integration Tests for Hello Endpoint
**Description:** Create integration tests for the /hello endpoint to verify the full request/response cycle.

Test cases:
- GET /hello returns HTTP status 200
- GET /hello returns correct JSON body with message "Hello, World!"
- GET /hello sets Content-Type header to application/json
- Non-GET requests to /hello return 405 Method Not Allowed
- Invalid paths return 404 Not Found

Use supertest for HTTP testing against the running Express app.

**Files to create:**
- tests/hello.test.ts

**Files to modify:**
- package.json (add test script)

**Complexity:** Medium

**Dependencies:** 5 (server entry point must exist first)

## File Structure

```
simple-test-project/
├── package.json
├── tsconfig.json
├── .gitignore
├── src/
│   ├── index.ts              # Server entry point
│   ├── config/
│   │   └── index.ts          # Configuration module
│   ├── routes/
│   │   └── hello.ts          # Hello route handler
│   └── types/
│       └── index.ts          # Type definitions
├── tests/
│   ├── config.test.ts        # Configuration unit tests
│   └── hello.test.ts         # Hello endpoint integration tests
└── dist/                     # Compiled output (generated)
```

## Testing Strategy

**Unit Testing (Jest):**
- Test configuration module with mocked environment variables
- Verify default values are applied correctly
- Test that environment variables override defaults

**Integration Testing (Jest + Supertest):**
- Start a real Express server on a test port
- Make actual HTTP requests to the /hello endpoint
- Verify HTTP status codes, response bodies, and headers
- Test error cases (404, 405)

**Test Execution:**
- Run `npm run build` to compile TypeScript before tests
- Run `npm test` to execute all tests
- Tests should pass with 100% coverage on configuration logic

**Acceptance Criteria for Testing:**
- All unit tests pass without errors
- All integration tests pass without errors
- Server starts and responds correctly to GET /hello
- Graceful shutdown works on SIGTERM/SIGINT

## Risks

1. **Environment Variable Conflicts:** PORT or NODE_ENV variables set in the deployment environment may conflict with defaults. Mitigation: Document environment variables and ensure proper precedence.

2. **TypeScript Compilation Errors:** Strict mode in tsconfig.json may cause compilation failures if types are not properly defined. Mitigation: Review all type definitions and add any missing type annotations.

3. **Port Already in Use:** If port 3000 is already bound, the server will fail to start. Mitigation: Add error handling for EADDRINUSE and provide clear error message.

4. **Graceful Shutdown Timing:** Server may not shut down cleanly if requests are in progress. Mitigation: Implement connection draining by rejecting new connections before closing existing ones.

5. **Missing Dependencies:** npm install may fail if network is unavailable or package registry is unreachable. Mitigation: Ensure package-lock.json is committed and document setup instructions.
