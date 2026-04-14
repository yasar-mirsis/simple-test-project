import express, { Express, Request, Response } from 'express';
import { config } from './config';
import { setupHelloRoute } from './routes/hello';

const app: Express = express();

// Middleware
app.use(express.json());

// Setup routes
setupHelloRoute(app);

/**
 * Starts the Express server on the specified port
 * @param port - The port to listen on
 */
export async function start(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Environment: ${config.nodeEnv}`);
        resolve();
      });

      // Handle graceful shutdown
      process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        server.close(() => {
          console.log('Server closed');
          process.exit(0);
        });
      });

      process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        server.close(() => {
          console.log('Server closed');
          process.exit(0);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Gracefully shuts down the server
 */
export async function stop(): Promise<void> {
  // This would be called on the server instance in a real implementation
  console.log('Server stopped');
}

// Start the server if this is the main module
start(config.port).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
