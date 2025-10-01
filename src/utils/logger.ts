import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

// Stable logger configuration - avoiding transport issues
export const getLoggerConfig = () => {
  if (isDevelopment) {
    // Development: Basic logger with simple output
    return {
      level: process.env.LOG_LEVEL || "info",
      formatters: {
        level: (label: string) => {
          return { level: label.toUpperCase() };
        },
        log: (object: any) => {
          return object;
        },
      },
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      base: null, // Remove pid, hostname
    };
  }

  // Production: JSON logs
  return {
    level: process.env.LOG_LEVEL || "info",
  };
};

// Standalone logger instance for manual logging - ALWAYS use stderr for MCP compatibility
// export const logger = pino(getLoggerConfig(), process.stderr); // To use locally in Claude Desktop
export const logger = pino(getLoggerConfig());

// Create child loggers for different modules
export const createModuleLogger = (module: string) => {
  return logger.child({ module });
};

// Specific loggers for MCP server use cases
export const serverLogger = createModuleLogger("server"); // Server lifecycle, startup/shutdown
export const routeLogger = createModuleLogger("routes"); // REST API routes (health, metrics)
export const mcpLogger = createModuleLogger("mcp"); // MCP protocol, sessions, transport
export const toolLogger = createModuleLogger("tools"); // Tool execution and registration

export default logger;
