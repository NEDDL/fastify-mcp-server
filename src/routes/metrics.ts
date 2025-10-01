import type { FastifyInstance } from "fastify";
import { routeLogger } from "../utils/logger.js";

export async function metricsRoutes(app: FastifyInstance) {
  app.get("/metrics", async () => {
    const metrics = {
      uptime: process.uptime(),
      timestamp: Date.now(),
    };

    routeLogger.debug({ metrics }, "Metrics requested");
    return metrics;
  });
}
