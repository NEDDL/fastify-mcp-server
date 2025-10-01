import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSummarizePrompt } from "./summarize.js";
import { mcpLogger } from "../utils/logger.js";

export function registerPrompts(mcp: McpServer) {
  registerSummarizePrompt(mcp);
  mcpLogger.debug("MCP prompts registered");
}
