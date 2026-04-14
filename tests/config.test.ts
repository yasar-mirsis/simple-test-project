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
  });

  afterAll(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe('Port Configuration', () => {
    it('should use default port 3000 when PORT is not set', () => {
      // Ensure PORT is not set
      delete process.env.PORT;
      
      // Re-import config to get fresh values
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(3000);
    });

    it('should use custom port when PORT environment variable is set', () => {
      process.env.PORT = '8080';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(8080);
    });

    it('should handle invalid port values by falling back to default', () => {
      process.env.PORT = 'invalid';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(3000);
    });

    it('should handle empty PORT by falling back to default', () => {
      process.env.PORT = '';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.port).toBe(3000);
    });
  });

  describe('Node Environment Configuration', () => {
    it('should use default nodeEnv "development" when NODE_ENV is not set', () => {
      // Ensure NODE_ENV is not set
      delete process.env.NODE_ENV;
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('development');
    });

    it('should use custom nodeEnv when NODE_ENV environment variable is set', () => {
      process.env.NODE_ENV = 'production';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('production');
    });

    it('should handle "test" environment correctly', () => {
      process.env.NODE_ENV = 'test';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('test');
    });

    it('should handle "development" environment correctly', () => {
      process.env.NODE_ENV = 'development';
      
      jest.resetModules();
      const freshConfig = require('../src/config').default;
      
      expect(freshConfig.nodeEnv).toBe('development');
    });
  });

  describe('Config Object Structure', () => {
    it('should have port property as a number', () => {
      expect(typeof config.port).toBe('number');
    });

    it('should have nodeEnv property as a string', () => {
      expect(typeof config.nodeEnv).toBe('string');
    });
  });
});
