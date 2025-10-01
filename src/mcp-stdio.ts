// To use locally in Claude Desktop Point to this entrypoint
// {
//   "mcpServers": {
//     "fruits": {
//       "command": "node",
//       "args": [
//         "/Users/Mustafa/Repos/mcp-servers/example-mcp-server/dist/mcp-stdio.js"
//       ],
//       "cwd": "/Users/Mustafa/Repos/mcp-servers/example-mcp-server"
//     }
//   }
// }

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateConfig } from "./config.js";
import { mcpLogger } from "./utils/logger.js";
import { createMcpServer } from "./mcp/index.js";

async function main() {
  try {
    // Validate config for stdio mode (no port required)
    validateConfig("stdio");

    // Create MCP server with all capabilities registered
    const server = createMcpServer();

    // Create stdio transport
    const transport = new StdioServerTransport();

    // Connect server to transport
    await server.connect(transport);

    mcpLogger.info("MCP server started via stdio");
  } catch (error) {
    mcpLogger.error(error, "Failed to start MCP server");
    process.exit(1);
  }
}

main().catch((error) => {
  mcpLogger.error(error, "Unhandled error in MCP server");
  process.exit(1);
});
