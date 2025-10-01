import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers the Health Check tool into an MCP server
 */
export function registerHealthTool(mcp: McpServer) {
  mcp.registerTool(
    "health_check",
    {
      title: "Health Check",
      description: "Check if the MCP server is healthy",
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "✅ MCP server is healthy and ready",
          },
        ],
      };
    },
  );
}
