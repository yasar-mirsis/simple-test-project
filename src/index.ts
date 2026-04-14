/**
 * Server entry point
 * Initializes and starts the Express application
 */

import express, { Express, Request, Response } from 'express';
import http from 'http';
import config from './config';
import { setupHelloRoute } from './routes/hello';

let app: Express;
let server: http.Server;

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
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

/**
 * Gracefully shuts down the HTTP server
 */
export async function stop(): Promise<void> {
  console.log('Shutting down server...');
  return new Promise((resolve) => {
    server.close(() => {
      console.log('Server stopped');
      resolve();
    });
  });
}

// Start the server when this module is run directly
if (require.main === module) {
  start(config.port).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
