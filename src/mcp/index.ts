import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "../tools/index.js";
import { mcpLogger } from "../utils/logger.js";
import { registerResources } from "../resources/index.js";
import { registerPrompts } from "../prompts/index.js";

export function createMcpServer() {
  mcpLogger.debug("Creating MCP server instance");

  const mcp = new McpServer({
    name: "example-mcp",
    description: "Example MCP server",
    version: "0.1.0",
  });

  registerTools(mcp);
  registerResources(mcp);
  registerPrompts(mcp);

  return mcp;
}
