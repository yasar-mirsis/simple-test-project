/**
 * Server entry point
 * Initializes and starts the Express application
 */

import express, { Express, Request, Response } from 'express';
import config from './config';
import { setupHelloRoute } from './routes/hello';

let app: Express;
let server: ReturnType<typeof express.Server.listen> | null = null;

/**
 * Starts the Express server on the specified port
 * @param port - The port to listen on
 */
export async function start(port: number): Promise<void> {
  app = express();

  // Setup routes
  setupHelloRoute(app);

  // Start server
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode`);
  });

  // Handle graceful shutdown
  async function handleShutdown(): Promise<void> {
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

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
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

// Start the server when run directly
start(config.port).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
