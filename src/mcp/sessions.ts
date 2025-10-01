import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpLogger } from "../utils/logger.js";

export function createSessionManager(mcp: McpServer) {
  const sessions = new Map<string, StreamableHTTPServerTransport>();
  const sessionTimestamps = new Map<string, number>();
  let cleanupInterval: NodeJS.Timeout | undefined;

  async function create() {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => {
        sessions.set(id, transport);
        sessionTimestamps.set(id, Date.now());
        mcpLogger.info(`New session initialized: ${id}`);
      },
      onsessionclosed: (id) => {
        sessions.delete(id);
        sessionTimestamps.delete(id);
        mcpLogger.info(`Session closed: ${id}`);
      },
    });

    await mcp.connect(transport);
    mcpLogger.debug("Connected transport");
    return transport;
  }

  async function reuseOrCreate(sessionId?: string) {
    if (sessionId && sessions.has(sessionId)) {
      mcpLogger.debug(`Reusing session: ${sessionId}`);
      // Update timestamp when session is actively used
      sessionTimestamps.set(sessionId, Date.now());
      return sessions.get(sessionId)!;
    }
    return create();
  }

  function get(sessionId: string) {
    return sessions.get(sessionId);
  }

  function destroy(sessionId: string) {
    const transport = sessions.get(sessionId);
    if (transport) {
      transport.close?.();
      sessions.delete(sessionId);
      sessionTimestamps.delete(sessionId);
      mcpLogger.info(`Session destroyed: ${sessionId}`);
      return true;
    }
    return false;
  }

  function destroyAll() {
    const count = sessions.size;
    for (const [id, transport] of sessions.entries()) {
      transport.close?.();
      sessions.delete(id);
      sessionTimestamps.delete(id);
    }
    if (count > 0) {
      mcpLogger.info(`Destroyed ${count} MCP sessions`);
    }
  }

  function getCount() {
    return sessions.size;
  }

  function cleanupStaleSessions(maxAgeMs: number = 30 * 60 * 1000) {
    // 30 minutes default
    const now = Date.now();
    const staleSessions: string[] = [];

    for (const [id, timestamp] of sessionTimestamps.entries()) {
      // Only process sessions that still exist in the sessions Map
      if (sessions.has(id) && now - timestamp > maxAgeMs) {
        staleSessions.push(id);
      }
    }

    for (const id of staleSessions) {
      mcpLogger.info(`Cleaning up stale session: ${id}`);
      destroy(id);
    }

    return staleSessions.length;
  }

  function startPeriodicCleanup(intervalMs: number = 5 * 60 * 1000) {
    // 5 minutes default
    if (cleanupInterval) {
      clearInterval(cleanupInterval);
    }

    cleanupInterval = setInterval(() => {
      const cleanedCount = cleanupStaleSessions();
      if (cleanedCount > 0) {
        mcpLogger.info(`Cleaned up ${cleanedCount} stale sessions`);
      }
    }, intervalMs);

    mcpLogger.debug(
      `Started periodic session cleanup (every ${intervalMs / 1000}s)`,
    );
  }

  function stopPeriodicCleanup() {
    if (cleanupInterval) {
      clearInterval(cleanupInterval);
      cleanupInterval = undefined;
      mcpLogger.debug("Stopped periodic session cleanup");
    }
  }

  return {
    create,
    reuseOrCreate,
    get,
    destroy,
    destroyAll,
    getCount,
    cleanupStaleSessions,
    startPeriodicCleanup,
    stopPeriodicCleanup,
  };
}
