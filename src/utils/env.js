/**
 * Gets an environment variable with fallbacks for different environments
 * 
 * @param {string} key - The environment variable key (without VITE_ prefix)
 * @param {any} defaultValue - Default value if not found
 * @returns {string} The environment variable value
 */
export function getEnvVariable(key, defaultValue = '') {
  // Check for Vite-specific environment variables (local development)
  const viteKey = `VITE_${key}`;
  
  // For local development with Vite
  if (import.meta.env[viteKey] !== undefined) {
    return import.meta.env[viteKey];
  }
  
  // For production (Vercel)
  if (process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  
  // Return default value if nothing is found
  return defaultValue;
}