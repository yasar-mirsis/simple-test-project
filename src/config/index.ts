/**
 * Configuration module for the application
 * Reads and validates environment variables
 */

interface Config {
  /** Server port (default: 3000) */
  port: number;
  /** Node environment (default: "development") */
  nodeEnv: string;
}

/**
 * Reads the port from environment variables or returns default
 */
function getPort(): number {
  const port = parseInt(process.env.PORT || '3000', 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    console.warn(`Invalid port ${port}, using default 3000`);
    return 3000;
  }
  return port;
}

/**
 * Reads the node environment from environment variables or returns default
 */
function getNodeEnv(): string {
  return process.env.NODE_ENV || 'development';
}

/**
 * Configuration object with validated environment variables
 */
export const config: Config = {
  port: getPort(),
  nodeEnv: getNodeEnv(),
};
