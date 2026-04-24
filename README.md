# 🚀 Fastify MCP Server

[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.8-orange.svg)](https://fastify.dev/)
[![MCP](https://img.shields.io/badge/MCP-1.29-purple.svg)](https://modelcontextprotocol.io/)
[![Zod](https://img.shields.io/badge/Zod-4-pink.svg)](https://zod.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **High-performance MCP (Model Context Protocol) server** built with Fastify, TypeScript, and functional programming principles. Production-ready with authentication, metrics, and auto-discovery capabilities.

## 🎯 About This Project

**Fastify MCP Server** is a production-grade implementation of the Model Context Protocol (MCP) specification, designed for AI agents and LLM applications. Built with modern TypeScript and functional programming paradigms, it provides a robust foundation for AI-powered applications requiring secure, scalable MCP server capabilities.

### 🔑 Key Benefits

- **⚡ Lightning Fast**: Built on Fastify - the fastest Node.js web framework
- **🔒 Enterprise Security**: Bearer token authentication and secure session management
- **📊 Production Ready**: Kubernetes health checks, metrics endpoints, and monitoring
- **🧩 Auto-Discovery**: Automatic registration of tools, resources, and prompts
- **🛡️ Type Safe**: Full TypeScript support with Zod validation
- **🎯 Functional**: Purely functional programming approach for reliability

## 📋 Table of Contents

- [🎯 About This Project](#-about-this-project)
- [✨ Features](#-features)
- [🚀 Use Cases](#-use-cases)
- [🏆 Why Choose This Server?](#-why-choose-this-server)
- [🏗️ Architecture](#️-architecture)
- [🔐 Security](#-security)
- [📁 MCP Capabilities](#-mcp-capabilities)
- [🚀 Quick Start](#-quick-start)
- [🔌 MCP Client Integration](#-mcp-client-integration)
- [🛠️ Development](#️-development)
- [📦 Tech Stack](#-tech-stack)
- [🤝 Contributing](#-contributing)
- [📚 Resources](#-resources)
- [📄 License](#-license)

## ✨ Features

- 🏎️ **Fastify-powered** - Lightning-fast HTTP server with TypeScript support
- 🔧 **MCP Protocol** - Full Model Context Protocol implementation with tools, resources, and prompts
- 🛡️ **Secure Authentication** - Bearer token middleware for MCP server connections
- 📊 **Production Ready** - Kubernetes health endpoints and metrics routes
- 🧩 **Modular Architecture** - Auto-registration system for MCP capabilities
- 🔒 **Type Safety** - Zod validation with `@modelcontextprotocol/sdk`
- 🎯 **Functional Programming** - Strictly functional paradigms throughout

## 🚀 Use Cases

Perfect for building:

- **AI Agent Platforms** - Secure MCP servers for AI applications
- **LLM Integration** - Connect language models with external tools and data
- **Enterprise AI** - Production-ready MCP infrastructure for organizations
- **Developer Tools** - Custom MCP servers for development workflows
- **API Gateways** - High-performance API endpoints with MCP capabilities
- **Microservices** - Scalable MCP services in distributed architectures

## 🏆 Why Choose This Server?

| Feature          | Fastify MCP Server   | Other Solutions     |
| ---------------- | -------------------- | ------------------- |
| **Performance**  | ⚡ Fastify-based     | ❌ Express/Slower   |
| **Type Safety**  | ✅ Full TypeScript   | ❌ JavaScript only  |
| **Security**     | 🔒 Bearer tokens     | ❌ Basic auth       |
| **Production**   | 📊 Metrics & Health  | ❌ Development only |
| **Architecture** | 🧩 Auto-discovery    | ❌ Manual setup     |
| **Standards**    | ✅ MCP 1.0 compliant | ❌ Custom protocols |

## ⚡ Production Readiness

- ✅ **Kubernetes** - Health checks and readiness probes
- ✅ **Monitoring** - Built-in metrics and logging
- ✅ **Security** - Bearer token authentication
- ✅ **Scalability** - Horizontal scaling support
- ✅ **Reliability** - Per-session MCP isolation, automatic stale session cleanup

## 🏗️ Architecture

### Core Components

- **Fastify Server** - High-performance HTTP server with custom MCP plugin
- **MCP Transport** - Injected as a Fastify plugin for seamless integration
- **Session Management** - Handles MCP client connections and state
- **Auto-registration** - Automatically discovers and registers MCP capabilities

### Endpoints

- `GET /health` - Kubernetes liveness probe (no auth)
- `GET /metrics` - Application metrics (no auth)
- `POST /mcp` - MCP StreamableHTTP transport (bearer auth required)

### Session Management

The MCP SDK requires **one `Server`/`Protocol` instance per transport**, so the session manager instantiates a fresh `McpServer` per connection (see `src/mcp/sessions.ts`). Sessions are tracked by ID and reaped after 30 minutes of inactivity.

- **Per-session isolation** - Each MCP client gets its own server instance
- **Activity-based timeouts** - Sessions stay alive while actively used
- **Automatic cleanup** - Stale sessions (30 min idle) removed every 5 min
- **Graceful shutdown** - All sessions closed on server stop

Session lifecycle: create (new UUID) → reuse on subsequent requests with same `mcp-session-id` header → cleanup when stale.

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

- **Node.js** >= 22 (recommended: 24.x LTS, see `.nvmrc`)
- **pnpm** (the project ships a `pnpm-lock.yaml`)
- **Git**

> 💡 With nvm: `nvm use` will pick up the version pinned in `.nvmrc` automatically.

### Installation

```bash
git clone https://github.com/your-username/fastify-mcp-server.git
cd fastify-mcp-server
pnpm install
pnpm build
```

### Development

```bash
pnpm dev    # HTTP server with hot reload (tsx watch)
pnpm mcp    # Run as stdio MCP server (for Claude Desktop direct integration)
pnpm start  # Production server (after pnpm build)
```

### Configuration

```bash
cp .env.example .env
```

```env
MCP_SERVER_PORT=9080
MCP_SERVER_HOST=localhost
MCP_SERVER_TOKEN=super-secret-token   # change for non-local use
LOG_LEVEL=debug
```

## 🔌 MCP Client Integration

Two integration paths — **stdio** (simplest, no server needed) or **HTTP** (test the production transport, auth, sessions).

### Claude Desktop — stdio (recommended for local dev)

Build first: `pnpm build`. Then add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "fastify-mcp-local": {
      "command": "node",
      "args": ["/absolute/path/to/fastify-mcp-server/dist/mcp-stdio.js"]
    }
  }
}
```

> ℹ️ The logger writes to stderr by default in stdio mode, so no extra config is needed.

### Claude Desktop — HTTP via `mcp-remote` bridge

Claude Desktop only spawns stdio processes locally. To consume the HTTP transport, bridge it with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "fastify-mcp-local": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:9080/mcp",
        "--header",
        "Authorization: Bearer super-secret-token"
      ]
    }
  }
}
```

Run `pnpm dev` first; then quit + reopen Claude Desktop. Logs at `~/Library/Logs/Claude/mcp-server-*.log`.

> ⚠️ `npx` resolves `node` from PATH. If you have multiple Node versions installed via nvm, ensure your default (`nvm alias default`) is Node ≥ 18, or `mcp-remote` will crash on `undici`.

### cURL / Postman

```bash
curl -X POST http://localhost:9080/mcp \
  -H "Authorization: Bearer super-secret-token" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'
```

In Postman: `POST http://localhost:9080/mcp`, Auth → Bearer Token = your `MCP_SERVER_TOKEN`.

## 🛠️ Development

### Adding New Capabilities

1. **Tools**: Add your tool in `src/tools/` and export it from `src/tools/index.ts`
2. **Resources**: Add your resource in `src/resources/` and export it from `src/resources/index.ts`
3. **Prompts**: Add your prompt in `src/prompts/` and export it from `src/prompts/index.ts`

The server will automatically register them on restart.

### Scripts

```bash
pnpm dev           # HTTP server with hot reload (tsx watch)
pnpm build         # Compile TypeScript → dist/
pnpm start         # Run compiled server (node dist/index.js)
pnpm mcp           # Run as stdio MCP server (after build)
pnpm check         # Type check without emit
pnpm lint          # ESLint --fix
pnpm lint:check    # ESLint, no fixes
pnpm format        # Prettier --write
pnpm format:check  # Prettier --check
pnpm clean         # Remove dist/
```

## 📦 Tech Stack

### Core Technologies

- **[Fastify](https://fastify.dev/)** - Fast and low overhead web framework
- **[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)** - Official MCP TypeScript SDK
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Pino](https://getpino.io/)** - Super fast, all natural JSON logger
- **TypeScript** - Type safety and modern JavaScript features

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **tsx** - TypeScript execution and watch mode
- **pnpm** - Package manager

### Keywords & Tags

`mcp-server` `fastify` `typescript` `ai-agents` `llm-integration` `model-context-protocol` `nodejs` `api-server` `production-ready` `authentication` `metrics` `kubernetes` `functional-programming` `type-safety` `enterprise` `microservices` `ai-platform` `developer-tools`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Quality

- ✅ **TypeScript** - Full type safety
- ✅ **ESLint** - Code quality and consistency
- ✅ **Prettier** - Code formatting
- ✅ **Tests** - Comprehensive test coverage
- ✅ **Documentation** - Clear and up-to-date docs

## 📚 Resources

### Documentation

- [MCP Specification](https://modelcontextprotocol.io/) - Official MCP documentation
- [Fastify Documentation](https://fastify.dev/) - Fastify framework guide
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript reference

### Community

- [GitHub Discussions](https://github.com/your-username/fastify-mcp-server/discussions) - Community discussions
- [Issues](https://github.com/your-username/fastify-mcp-server/issues) - Bug reports and feature requests
- [Discord](https://discord.gg/your-server) - Real-time community chat

### Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol) - Official MCP organization
- [Fastify Ecosystem](https://fastify.dev/ecosystem/) - Fastify plugins and tools
- [TypeScript MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Official TypeScript SDK

## 📄 License

**Copyright © 2025–2026 Mustafa ONAL**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ using functional programming principles and modern TypeScript_

### 🌟 Star This Repository

If you find this project helpful, please give it a star ⭐ on GitHub!
