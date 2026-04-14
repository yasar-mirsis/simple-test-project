/**
 * API Response Types
 */

/**
 * Response type for the GET /hello endpoint
 */
export interface HelloResponse {
  message: string;
}

/**
 * Application configuration type
 */
export interface Config {
  port: number;
  nodeEnv: string;
}
