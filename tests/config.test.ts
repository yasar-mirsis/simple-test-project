/**
 * Unit tests for the configuration module
 * Tests environment variable handling and default values
 */

import config from '../src/config';

// Save original environment variables
const originalEnv = process.env;

describe('Configuration Module', () => {
  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    // Clear the module cache to re-evaluate config with new env vars
    jest.resetModules();
  });

  afterAll(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe('Port Configuration', () => {
    it('should have default port 3000 when PORT is not set', () => {
      // Ensure PORT is not set
      delete process.env.PORT;
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(3000);
    });

    it('should use custom port when PORT environment variable is set', () => {
      const customPort = '8080';
      process.env.PORT = customPort;
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(8080);
    });

    it('should handle invalid port values by falling back to default', () => {
      process.env.PORT = 'invalid';
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(3000);
    });
  });

  describe('Node Environment Configuration', () => {
    it('should have default nodeEnv "development" when NODE_ENV is not set', () => {
      // Ensure NODE_ENV is not set
      delete process.env.NODE_ENV;
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('development');
    });

    it('should use custom nodeEnv when NODE_ENV environment variable is set', () => {
      const customEnv = 'production';
      process.env.NODE_ENV = customEnv;
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('production');
    });

    it('should handle empty NODE_ENV by falling back to default', () => {
      process.env.NODE_ENV = '';
      
      // Re-import config to get fresh evaluation
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('development');
    });
  });
});
