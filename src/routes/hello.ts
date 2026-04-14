import { Express, Request, Response } from 'express';

/**
 * HelloResponse interface for type safety
 */
interface HelloResponse {
  message: string;
}

/**
 * Sets up the /hello route with the Express application
 * @param app - The Express application instance
 */
export function setupHelloRoute(app: Express): void {
  app.get('/hello', (req: Request, res: Response<HelloResponse>) => {
    // Set Content-Type header explicitly (Express does this for JSON, but being explicit)
    res.setHeader('Content-Type', 'application/json');

    // Return the hello response
    const response: HelloResponse = {
      message: 'Hello, World!',
    };

    res.status(200).json(response);
  });
}
