import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toolLogger } from "../utils/logger.js";

/**
 * Registers the Echo tool into an MCP server
 */
export function registerEchoTool(mcp: McpServer) {
  mcp.registerTool(
    "echo",
    {
      title: "Echo Tool",
      description: "Echoes back your input",
      inputSchema: { message: z.string() },
    },
    async ({ message }) => {
      toolLogger.info({ message }, "Echo tool executed");
      return { content: [{ type: "text", text: message }] };
    }
  );
  toolLogger.debug("Echo tool registered");
}
