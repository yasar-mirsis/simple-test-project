# AGENTS.md — simple-test-project

This file describes the project for AI agents working on implementation issues.

## Project Context

# Analysis Document

**Project Name:** simple-test-project
**Date:** 2026-04-14

---

## Stakeholders

| Stakeholder | Role | Responsibilities | Priority |
|-------------|------|------------------|----------|
| Development Team | Implementation | Build and maintain the API | Must |
| QA Team | Testing | Verify functionality and edge cases | Must |
| DevOps Team | Deployment | Configure deployment pipeline | Should |
| Product Owner | Requirements | Define and validate requirements | Must |

---

## User Stories

### US-1: Implement Hello Endpoint
**As a** developer  
**I want** to access a GET /hello endpoint  
**So that** I can verify the API is running and responding correctly

**Acceptance Criteria:**
- [ ] Given a GET request to /hello, when the endpoint is called, then it returns HTTP 200 status
- [ ] Given a GET request to /hello, when the endpoint is called, then the response body contains `{"message": "Hello, World!"}`
- [ ] Given a GET request to /hello, when the endpoint is called, then the response Content-Type is `application/json`
- [ ] Given the server is running, when any valid request is made, then the server does not crash

**Priority:** Must

### US-2: TypeScript Setup
**As a** developer  
**I want** the project to use TypeScript  
**So that** we get type safety and better IDE support

**Acceptance Criteria:**
- [ ] Given the project structure, when TypeScript is configured, then tsconfig.json exists with appropriate settings
- [ ] Given the server entry point, when written in TypeScript, then it compiles without errors
- [ ] Given Express types, when installed, then they are properly imported and used

**Priority:** Must

### US-3: Express Server Setup
**As a** developer  
**I want** to use Express as the web framework  
**So that** we have a minimal, established HTTP server

**Acceptance Criteria:**
- [ ] Given the project dependencies, when Express is installed, then it is listed in package.json
- [ ] Given the server starts, when the application runs, then Express listens on a configurable port
- [ ] Given the server is running, when a request is made to /hello, then Express routes it correctly

**Priority:** Must

---

## Functional Requirements

### FR-1: GET /hello Endpoint
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | The API MUST expose a single endpoint at path `/hello` | Must |
| FR-1.2 | The endpoint MUST accept only HTTP GET requests | Must |
| FR-1.3 | The endpoint MUST return a JSON response with status code 200 | Must |
| FR-1.4 | The response body MUST be exactly `{"message": "Hello, World!"}` | Must |
| FR-1.5 | The response MUST include Content-Type header set to `application/json` | Must |
| FR-1.6 | The endpoint MUST NOT accept any query parameters or request body | Should |

### FR-2: Server Configuration
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | The server MUST listen on a configurable port (default: 3000) | Must |
| FR-2.2 | The server MUST log

[... truncated for brevity ...]

## Architecture

# System Architecture

**Project Name:** simple-test-project  
**Version:** 1.0.0  
**Date:** 2026-04-14

---

## System Overview

simple-test-project is a minimal REST API built with Express.js and TypeScript. The system exposes a single endpoint (`GET /hello`) that returns a JSON greeting message. The architecture follows a simple single-tier server design with clear separation between server configuration, routing, and response handling.

**Key Characteristics:**
- Single-process Node.js server
- TypeScript for type safety and developer experience
- Express.js as the HTTP framework
- No external dependencies beyond the web server
- Configurable runtime via environment variables

**Architecture Diagram:**

```
┌─────────────────┐
│   HTTP Client   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Express Server │
│  (Node.js)      │
│  Port: 3000     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Routes        │
│  /hello (GET)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Response       │
│  {"message":    │
│   "Hello,       │
│   World!"}      │
└─────────────────┘
```

---

## Components

### 1. Server Entry Point (`src/index.ts`)

**Responsibility:**  
- Initialize and configure the Express application
- Set up HTTP server with configurable port
- Handle graceful shutdown on SIGTERM/SIGINT signals
- Log startup information

**Interfaces:**
- `start(port: number): Promise<void>` - Starts the server on the specified port
- `stop(): Promise<void>` - Gracefully shuts down the server

**Dependencies:**
- Express application instance
- Node.js http module (via Express)
- Environment variable reader

---

### 2. Routes Module (`src/routes/hello.ts`)

**Responsibility:**
- Define the `/hello` endpoint route
- Handle GET requests and return JSON response
- Validate request method (GET only)

**Interfaces:**
- `setupHelloRoute(app: Express): void` - Registers the hello route with the Express app

**Dependencies:**
- Express routing API

---

### 3. Configuration Module (`src/config/index.ts`)

**Responsibility:**
- Read and validate environment variables
- Provide typed configuration access throughout the application

**Interfaces:**
- `config.port: number` - Server port (default: 3000)
- `config.nodeEnv: string` - Node environment (default: "development")

**Dependencies:**
- Node.js process.env

---

## Data Model

This is a minimal API with no persistent data storage. The data model consists solely of the response payload structure.

### Response Entities

#### HelloResponse
```typescript
interface HelloResponse {
  message: string;  // Always "Hello, World!"
}
```

**Relationships:**
- No relationships - standalone response object
- Immutable content - same response for all valid requests

### Request Entities

#### HelloRequest
```typescript
interface HelloRequest {
  // No query parameters expected
  // No request body expected
}
```

---

## API Contracts

### Endpoint: GET /hello



[... truncated for brevity ...]

## Working Guidelines

- Read this file and README.md before starting any work
- Follow existing code patterns and conventions
- Write clean, production-quality code with proper error handling
- Create or update tests if a testing setup exists
- Do NOT run git commands — the pipeline handles commits and pushes
- Do NOT ask questions — you are running in an automated pipeline