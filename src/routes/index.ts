import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./health.js";
import { metricsRoutes } from "./metrics.js";
import routeLogger from "../utils/logger.js";

export async function registerRoutes(app: FastifyInstance) {
  await healthRoutes(app);
  routeLogger.info("Health route registered: /health");
  await metricsRoutes(app);
  routeLogger.info("Metrics route registered: /metrics");
}
