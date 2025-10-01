import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerCompanyProfile(mcp: McpServer) {
  mcp.registerResource(
    "company_profile",
    "company://profile",
    {
      title: "Company Profile",
      description: "Information about the creator of this MCP server",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(
            {
              name: "Fastify MCP Server",
              created: "2025",
              description: "A minimal, functional-style MCP server built with Fastify",
              features: [
                "Fastify-powered HTTP server",
                "MCP Protocol implementation",
                "Secure authentication",
                "Production ready",
                "Modular architecture",
              ],
              repository: "https://github.com/mustafaonal/fastify-mcp-server",
            },
            null,
            2, // Pretty-print JSON
          ),
        },
      ],
    }),
  );
}
