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
  app.get('/hello', (req, res): void => {
    const response: HelloResponse = {
      message: 'Hello, World!',
    };

    res.status(200).json(response);
  });
}
