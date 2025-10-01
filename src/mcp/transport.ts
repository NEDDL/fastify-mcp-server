import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import type { createSessionManager } from "./sessions.js";
import type { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { mcpLogger } from "../utils/logger.js";
import { bearerAuth } from "../middleware/auth.js";

type SessionManager = ReturnType<typeof createSessionManager>;

export interface McpTransportOptions {
  sessionManager: SessionManager;
  bearerToken: string;
}

async function mcpTransportPlugin(
  app: FastifyInstance,
  opts: McpTransportOptions,
) {
  const { sessionManager, bearerToken } = opts;

  app.addHook("onRequest", async (req, reply) => {
    if (!req.url?.startsWith("/mcp")) return;

    // 🔐 Centralized bearerAuth check
    await bearerAuth(bearerToken)(req, reply);
    if (reply.sent) return; // stop if auth failed

    // 🎯 MCP transport
    reply.hijack();
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    try {
      const transport: StreamableHTTPServerTransport =
        await sessionManager.reuseOrCreate(sessionId);

      await transport.handleRequest(req.raw, reply.raw);
    } catch (err) {
      mcpLogger.error(
        { err, sessionId: sessionId?.slice(0, 8) },
        "MCP transport failed",
      );
      reply.raw.statusCode = 500;
      reply.raw.end("MCP transport error");
    }
  });

  mcpLogger.info("MCP transport plugin registered at /mcp");
}

export default fp(mcpTransportPlugin, {
  name: "mcp-transport",
});
