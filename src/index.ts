/**
 * Server entry point
 * Initializes and starts the Express application
 */

import express, { Express } from 'express';
import config from './config';
import { setupHelloRoute } from './routes/hello';

/**
 * Starts the Express server on the specified port
 * @param port - The port to listen on
 */
async function start(port: number): Promise<void> {
  const app: Express = express();

  // Setup routes
  setupHelloRoute(app);

  // Start server
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode`);
  });

  // Handle graceful shutdown
  async function stop(): Promise<void> {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  }

  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

// Start the server
start(config.port).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
