/**
 * Server entry point
 * Initializes and starts the Express application
 */

import express, { Express } from 'express';
import http from 'http';
import config from './config';
import { setupHelloRoute } from './routes/hello';

let server: http.Server | null = null;
let app: Express | null = null;

/**
 * Creates and configures the Express application
 * @returns The configured Express application instance
 */
export function createApp(): Express {
  const app: Express = express();

  // Setup routes
  setupHelloRoute(app);

  return app;
}

/**
 * Starts the Express server on the specified port
 * @param port - The port to listen on
 */
export async function start(port: number): Promise<void> {
  app = createApp();

  // Start server
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode`);
  });

  // Handle graceful shutdown
  async function shutdown(): Promise<void> {
    console.log('Shutting down server...');
    if (server) {
      server.close(() => {
        console.log('Server stopped');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  }

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

/**
 * Stops the Express server gracefully
 */
export async function stop(): Promise<void> {
  console.log('Shutting down server...');
  if (server) {
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

/**
 * Gets the current Express application instance
 * Useful for testing purposes
 * @returns The Express application or null if not initialized
 */
export function getApp(): Express | null {
  return app;
}

// Start the server when run directly (skip in test environment)
if (config.nodeEnv !== 'test') {
  start(config.port).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
