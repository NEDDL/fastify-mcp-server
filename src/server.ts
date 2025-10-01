import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

import { createMcpServer } from "./mcp/index.js";
import { createSessionManager } from "./mcp/sessions.js";
import mcpTransportPlugin from "./mcp/transport.js";
import { registerRoutes } from "./routes/index.js";
import { getLoggerConfig, serverLogger } from "./utils/logger.js";
import { config } from "./config.js";

export async function buildServer() {
  const app = fastify({
    logger: {
      ...getLoggerConfig(),
      // Reduce request logging noise - only log errors and slow requests
      serializers: {
        req: () => ({}), // Don’t log full request details
        res: () => ({}), // Don’t log full response details
      },
    },
    disableRequestLogging: true,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  serverLogger.info("Starting server initialization");

  // Register all REST routes (health, metrics, etc.)
  await registerRoutes(app);

  // Create MCP server + session manager
  const mcp = createMcpServer();
  const sessionManager = createSessionManager(mcp);

  // Register MCP transport plugin
  await app.register(mcpTransportPlugin, {
    sessionManager,
    bearerToken: config.auth.bearerToken,
  });

  serverLogger.info("Server initialization complete");

  // Start periodic session cleanup (every 5 minutes)
  sessionManager.startPeriodicCleanup();

  return { app, sessionManager };
}
