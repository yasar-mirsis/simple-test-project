/**
 * Integration tests for the /hello endpoint
 * Tests the full request/response cycle using supertest
 */

import request from 'supertest';
import { createApp } from '../src/index';

describe('GET /hello - Integration Tests', () => {
  let app: ReturnType<typeof createApp>;

  beforeAll(() => {
    app = createApp();
  });

  describe('Successful GET requests', () => {
    it('should return HTTP status 200', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.status).toBe(200);
    });

    it('should return correct JSON body with message "Hello, World!"', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.body).toEqual({
        message: 'Hello, World!'
      });
    });

    it('should set Content-Type header to application/json', async () => {
      const response = await request(app).get('/hello');
      
      expect(response.headers['content-type']).toContain('application/json');
    });

    it('should return valid JSON response', async () => {
      const response = await request(app).get('/hello');
      
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toBe('Hello, World!');
    });
  });

  describe('Non-GET requests to /hello', () => {
    it('should return 405 Method Not Allowed for POST', async () => {
      const response = await request(app).post('/hello');
      
      expect(response.status).toBe(405);
    });

    it('should return 405 Method Not Allowed for PUT', async () => {
      const response = await request(app).put('/hello');
      
      expect(response.status).toBe(405);
    });

    it('should return 405 Method Not Allowed for DELETE', async () => {
      const response = await request(app).delete('/hello');
      
      expect(response.status).toBe(405);
    });

    it('should return 405 Method Not Allowed for PATCH', async () => {
      const response = await request(app).patch('/hello');
      
      expect(response.status).toBe(405);
    });
  });

  describe('Invalid paths', () => {
    it('should return 404 Not Found for non-existent paths', async () => {
      const response = await request(app).get('/nonexistent');
      
      expect(response.status).toBe(404);
    });

    it('should return 404 Not Found for /hello/world', async () => {
      const response = await request(app).get('/hello/world');
      
      expect(response.status).toBe(404);
    });

    it('should return 404 Not Found for /api/hello', async () => {
      const response = await request(app).get('/api/hello');
      
      expect(response.status).toBe(404);
    });

    it('should return 404 Not Found for root path with invalid method', async () => {
      const response = await request(app).post('/');
      
      expect(response.status).toBe(404);
    });
  });

  describe('Edge cases', () => {
    it('should handle query parameters without crashing', async () => {
      const response = await request(app).get('/hello?foo=bar');
      
      // The endpoint should still return 200, query params are ignored
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello, World!');
    });

    it('should handle empty query parameters', async () => {
      const response = await request(app).get('/hello?');
      
      expect(response.status).toBe(200);
    });

    it('should handle trailing slash', async () => {
      const response = await request(app).get('/hello/');
      
      // Express may or may not handle trailing slash the same way
      // This test just ensures the server doesn't crash
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(500);
    });
  });
});
