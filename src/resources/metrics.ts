import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import os from "os";

export function registerMetrics(mcp: McpServer) {
  mcp.registerResource(
    "metrics",
    "server://metrics",
    {
      title: "Server Metrics",
      description: "System metrics for the MCP server",
      mimeType: "application/json",
    },
    async (uri) => {
      const load = os.loadavg();
      const memory = process.memoryUsage();

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(
              {
                uptime: process.uptime(),
                loadavg: load,
                memory,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}
