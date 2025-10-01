import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toolLogger } from "../utils/logger.js";
import { registerEchoTool } from "./echo.js";
import { registerHealthTool } from "./health.js";

/**
 * Register all tools into the given MCP server.
 */
export function registerTools(mcp: McpServer) {
  registerEchoTool(mcp);
  registerHealthTool(mcp);
  toolLogger.debug("MCP tools registered");
}
