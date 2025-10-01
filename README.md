# 🚀 Example MCP Server

> A minimal, functional-style MCP (Model Context Protocol) server built with **Fastify** - the fastest Node.js API framework.

## ✨ Features

- 🏎️ **Fastify-powered** - Lightning-fast HTTP server with TypeScript support
- 🔧 **MCP Protocol** - Full Model Context Protocol implementation with tools, resources, and prompts
- 🛡️ **Secure Authentication** - Bearer token middleware for MCP server connections
- 📊 **Production Ready** - Kubernetes health endpoints and metrics routes
- 🧩 **Modular Architecture** - Auto-registration system for MCP capabilities
- 🔒 **Type Safety** - Zod validation with `@modelcontextprotocol/sdk`
- 🎯 **Functional Programming** - Strictly functional paradigms throughout

## 🏗️ Architecture

### Core Components

- **Fastify Server** - High-performance HTTP server with custom MCP plugin
- **MCP Transport** - Injected as a Fastify plugin for seamless integration
- **Session Management** - Handles MCP client connections and state
- **Auto-registration** - Automatically discovers and registers MCP capabilities

### Endpoints

- `GET /health` - Kubernetes liveness probe
- `GET /metrics` - Application metrics endpoint
- **MCP Transport** - WebSocket/HTTP transport for MCP protocol

### Session Management

The server includes intelligent session management with automatic cleanup:

- **Activity-based timeouts** - Sessions are kept alive as long as they're actively used
- **Automatic cleanup** - Stale sessions (30 minutes of inactivity) are automatically removed
- **Periodic maintenance** - Cleanup runs every 5 minutes to prevent memory leaks
- **Graceful shutdown** - All sessions are properly closed when the server shuts down

Session lifecycle:

1. **Creation** - New session initialized with unique ID
2. **Activity tracking** - Timestamp updated on every request
3. **Cleanup** - Sessions inactive for 30+ minutes are automatically removed
4. **Logging** - Full session lifecycle is logged for debugging

## 🔐 Security

The server includes authentication middleware (`src/middleware/auth.ts`) that verifies MCP connections using a bearer token. The token is configured via the `MCP_SERVER_TOKEN` environment variable, ensuring secure access to the MCP server capabilities.

## 📁 MCP Capabilities

The server automatically registers **tools**, **resources**, and **prompts** from their respective folders when you update the `index.ts` file in each directory:

### 🛠️ Tools

Active, callable functions that perform operations and return structured outputs. Perfect for:

- State changes and side effects
- External API calls and computations
- Agentic workflows where the LLM chooses which tool to invoke

### 📚 Resources

Read-only, structured data surfaces exposed via URI. Ideal for:

- Contextual knowledge and documentation
- Shared context across sessions
- Binary content and large artifacts

### 📝 Prompts

Parameterized instruction templates for reusable AI workflows. Great for:

- Standardized tasks (summarization, translation, etc.)
- Separating prompt engineering from application logic
- Multi-step orchestrated workflows

> 💡 Each capability type has detailed documentation in its respective `README.md` file.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.10.0
- npm or yarn

> 💡 **Node Version Manager**: If you have nvm installed, you can use `nvm use 24` to switch to Node.js 24

### Installation

```bash
# Clone the repository
git clone git@gitlab.tools.outerhr.net:Onal/fastify-mcp-server.git
cd example-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run as MCP server (stdio mode)
npm run mcp

# Start production server
npm start
```

### Configuration

Copy the provided `.env.example` file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
MCP_SERVER_PORT=9080
MCP_SERVER_HOST=localhost
MCP_SERVER_TOKEN=your-secure-bearer-token-here
NODE_ENV=development
```

## 🔌 MCP Client Integration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "example-server": {
      "command": "node",
      "args": ["/path/to/example-mcp-server/dist/mcp-stdio.js"],
      "cwd": "/path/to/example-mcp-server"
    }
  }
}
```

> ⚠️ **Important**: For local usage with Claude Desktop, you need to modify `src/utils/logger.ts` to use stderr for MCP compatibility. Uncomment the line:
>
> ```typescript
> export const logger = pino(getLoggerConfig(), process.stderr); // To use locally in Claude Desktop
> ```
>
> This prevents stdout corruption that can cause MCP communication errors.

### Postman Testing

For local testing and development, you can use Postman's MCP connection feature:

1. **Open Postman** and create a new request
2. **Set the URL** to: `http://localhost:9080/mcp`
3. **Add Authorization**:
   - Type: `Bearer Token`
   - Token: Your `MCP_SERVER_TOKEN` from `.env`
4. **Send MCP requests** to test tools, resources, and prompts

This allows you to interact with the MCP server directly through HTTP without needing Claude Desktop.

### HTTP Transport

The server also supports HTTP-based MCP transport on the configured port with bearer token authentication.

## 🛠️ Development

### Adding New Capabilities

1. **Tools**: Add your tool in `src/tools/` and export it from `src/tools/index.ts`
2. **Resources**: Add your resource in `src/resources/` and export it from `src/resources/index.ts`
3. **Prompts**: Add your prompt in `src/prompts/` and export it from `src/prompts/index.ts`

The server will automatically register them on restart.

### Scripts

```bash
npm run dev          # Development with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run mcp          # Run as MCP server (stdio)
npm run lint         # Lint and fix code
npm run format       # Format code with Prettier
npm run check        # Type check without building
```

## 📦 Tech Stack

- **[Fastify](https://fastify.dev/)** - Fast and low overhead web framework
- **[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)** - Official MCP TypeScript SDK
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Pino](https://getpino.io/)** - Super fast, all natural JSON logger
- **TypeScript** - Type safety and modern JavaScript features

## 📄 License

**Copyright © 2025 Mustafa ONAL**

This project is open source software. All rights reserved.

---

_Built with ❤️ using functional programming principles and modern TypeScript_
