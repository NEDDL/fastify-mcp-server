import type { FastifyInstance } from "fastify";
import { routeLogger } from "../utils/logger.js";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    routeLogger.debug("Health check requested");
    return { status: "ok" };
  });
}
