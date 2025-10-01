# Resources in MCP

## Purpose

Resources are **read-only, structured data surfaces** (e.g. files, docs, API snapshots, domain state) exposed via URI. Clients can call `resources/read` to retrieve these contents (text or blob).

They are meant to serve as **contextual knowledge** that the model or agent can consult rather than recompute.

## When It’s Interesting to Use Resources

- You want to expose data that is useful context (e.g., documentation, dataset snapshots, previous analysis) without forcing it to be recalculated.
- For **shared context among agents or sessions**, so multiple clients can access the same dataset without duplicating calls. :contentReference[oaicite:4]{index=4}
- For **binary content** or large artifacts (images, PDFs, logs), which are cumbersome to return as strings in tools. :contentReference[oaicite:5]{index=5}
- For **caching & consistency** — resources can be fetched once and reused across prompts/tools, improving performance.

## Challenges & Community Feedback

- **Passive / unused by clients** — many users find resources “meh” because clients don’t automatically include them or LLMs don’t know to fetch them. :contentReference[oaicite:6]{index=6}
- **Ambiguous utility vs tools** — developers often ask: “Why not just make a tool that returns the data?” :contentReference[oaicite:7]{index=7}
- **Template URI complexity** — dynamic URIs (e.g. `resource://{id}`) need careful design and client support for argument resolution.
- **Log noise and parsing interference** — writing logs to stdout rather than stderr can corrupt resource communication (as you saw).
- **Security / trust concerns** — exposing resources with sensitive data requires careful permissioning.
