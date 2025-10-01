import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { mcpLogger } from "../utils/logger.js";

export function registerSummarizePrompt(mcp: McpServer) {
  mcp.registerPrompt(
    "summarize_text",
    {
      title: "Summarize Text",
      description: "Summarize a given text into a shorter version",
      argsSchema: {
        text: z.string(),
        length: z.enum(["short", "medium", "long"]).optional(),
      },
    },
    async (args) => {
      mcpLogger.debug({ args }, "Summarize prompt called with args");
      const { text, length } = args;

      const summary =
        length === "short"
          ? text.slice(0, 50) + "..."
          : text.slice(0, 100) + "...";

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Summary (${length ?? "default"}): ${summary}`,
            },
          },
        ],
      };
    },
  );
  mcpLogger.debug("Summarize prompt registered");
}
