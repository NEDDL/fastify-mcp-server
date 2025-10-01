# Prompts in MCP

## Purpose

Prompts are **parameterized instruction templates** that the LLM or client can “execute” with arguments. They act as reusable building blocks (or workflows) that steer how the AI uses tools, resources, or itself.

Instead of hand-writing the prompt each time, you expose prompt definitions (name + argument schema + handler logic) so clients or agents can discover and call them.

## When It’s Interesting to Use Prompts

- You have _common tasks_ you want agents to do (summarization, translation, code generation, design workflows) and want to standardize them.
- You want to separate _prompt engineering_ from agent logic, letting clients or AI systems pick a prompt rather than embedding text in code.
- You want to expose “recipes” or “playbooks” to the model, telling it “first do this, then that,” with controlled structure.
- In creative or narrative domains, prompts can combine text, resource references, and tool calls (some builders use prompts to orchestrate multi-step flows). :contentReference[oaicite:0]{index=0}

## Challenges & Community Feedback

- **Limited client support / adoption** — many MCP clients (especially Claude’s UI) don’t fully support prompt UIs or argument passing yet. :contentReference[oaicite:1]{index=1}
- **Visibility vs automation** — prompt definitions may list in `prompts/list`, but clients often don’t auto-invoke them; you must explicitly request execution.
- **Overlap with tools** — some argue that any prompt logic could be folded into a tool, and tools are more universally supported. :contentReference[oaicite:2]{index=2}
- **Complex workflows / mixing returns** — prompts that return a mix of text, resource pointers, and tool calls need careful design (clients must know how to interpret). :contentReference[oaicite:3]{index=3}
