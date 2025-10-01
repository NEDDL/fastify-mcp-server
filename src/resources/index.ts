import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCompanyProfile } from "./company-profile.js";
import { registerFruits } from "./fruits.js";
import { registerMetrics } from "./metrics.js";

export function registerResources(mcp: McpServer) {
  registerCompanyProfile(mcp);
  registerFruits(mcp);
  registerMetrics(mcp);
}
