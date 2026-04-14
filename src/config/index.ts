/**
 * Configuration module
 * Reads and validates environment variables for the application.
 */

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '', 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
