/**
 * Hello route module
 * Defines the GET /hello endpoint
 */

import { Express } from 'express';
import { HelloResponse } from '../types';

/**
 * Registers the hello route with the Express application
 * @param app - The Express application instance
 */
export function setupHelloRoute(app: Express): void {
  // Handle GET requests to /hello
  app.get('/hello', (req, res): void => {
    const response: HelloResponse = {
      message: 'Hello, World!',
    };

    res.status(200).json(response);
  });

  // Handle non-GET requests to /hello with 405 Method Not Allowed
  app.post('/hello', (req, res): void => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });

  app.put('/hello', (req, res): void => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });

  app.delete('/hello', (req, res): void => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });

  app.patch('/hello', (req, res): void => {
    res.status(405).json({ error: 'Method Not Allowed' });
  });
}
