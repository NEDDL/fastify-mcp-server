// Load .env variables - suppress all potential output to stdout
import { config as dotenvConfig } from "dotenv";

// Temporarily redirect stdout during dotenv load
const originalStdoutWrite = process.stdout.write;
process.stdout.write = () => true; // Suppress all stdout during config
dotenvConfig({ debug: false });
process.stdout.write = originalStdoutWrite;

// Dynamic config that reads environment variables at runtime
export const getConfig = () => ({
  api: {
    port: Number(process.env.MCP_SERVER_PORT || "9080"),
    host: process.env.MCP_SERVER_HOST || "localhost",
  },
  auth: {
    bearerToken: process.env.MCP_SERVER_TOKEN || "super-secret-token", // fallback default
  },
});

// For backward compatibility, export a config object
export const config = getConfig();

// Validate required environment variables
export const validateConfig = (mode: "http" | "stdio" = "http"): void => {
  // In stdio mode (MCP), we don't need MCP_SERVER_PORT
  if (mode === "stdio") {
    return;
  }

  const required = ["MCP_SERVER_PORT"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

// Check if we have all required environment variables
export const hasValidConfig = (): boolean => {
  try {
    validateConfig();
    return true;
  } catch {
    return false;
  }
};
