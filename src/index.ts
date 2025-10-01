import { buildServer } from "./server.js";
import { config, validateConfig } from "./config.js";
import { serverLogger } from "./utils/logger.js";

async function start() {
  try {
    validateConfig(); // throws if missing vars
    serverLogger.info("Configuration validated successfully");

    const { app, sessionManager } = await buildServer();

    const shutdown = async () => {
      serverLogger.info(
        "Shutdown signal received, gracefully shutting down...",
      );

      // Stop periodic cleanup and destroy all sessions
      sessionManager.stopPeriodicCleanup();
      sessionManager.destroyAll();
      await app.close();
      serverLogger.info("Server shutdown complete");
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    await app.listen({
      port: config.api.port,
      host: config.api.host,
    });

    const address = `http://${config.api.host}:${config.api.port}`;
    serverLogger.info(`🚀 Server running at ${address}`);
  } catch (err) {
    serverLogger.error(err, "Failed to start server");
    process.exit(1);
  }
}

start().catch((err) => {
  serverLogger.error(err, "Failed to start application");
  process.exit(1);
});
