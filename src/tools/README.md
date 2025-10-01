# Tools in MCP

## Purpose

Tools are **active, callable functions** in the MCP server. They accept inputs, perform operations or side effects, and return structured outputs. Tools are the “verbs” in MCP (contrast to resources’ “nouns”).

Clients know how to call tools via `tools/call`, and they are the most widely supported primitive across MCP clients and ecosystems.

## When It’s Interesting to Use Tools

- When you need to **cause state changes**, side effects, mutations (e.g. write to DB, send email).
- For **computational or fetch operations** where logic is needed (e.g. external API calls, aggregations).
- When you want the LLM to _choose_ which tool to invoke during reasoning or agentic flow.
- When the client doesn’t support resources/prompts — tools are the fallback that _always work_. :contentReference[oaicite:8]{index=8}

## Challenges & Community Feedback

- **Input/output schema design** — defining robust types (with Zod or JSON schema) so invalid calls are caught early.
- **Error handling** — handling partial failures, timeouts, and returning useful error messages to the LLM.
- **Tool explosion / prompt bloat** — as you add many tools, selecting the right one becomes harder; some research (RAG-MCP) suggests retrieval to prune tools. :contentReference[oaicite:9]{index=9}
- **Security attack surface** — tools are riskier (can change state). Recent research shows MCP can be exploited by malicious tool chains. :contentReference[oaicite:10]{index=10}
- **Overlap case decisions** — deciding whether something should be a tool, a prompt, or a resource is nontrivial and requires design tradeoffs.
