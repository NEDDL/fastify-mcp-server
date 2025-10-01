import {
  ResourceTemplate,
  McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Dummy "fruits" data source
 */
function getFruitData(name: string) {
  const fruits = {
    apple: { color: "red", taste: "sweet", origin: "France" },
    banana: { color: "yellow", taste: "sweet", origin: "Ecuador" },
    orange: { color: "orange", taste: "citrus", origin: "Spain" },
  };
  return fruits[name as keyof typeof fruits];
}

export function registerFruits(mcp: McpServer) {
  mcp.registerResource(
    "fruits",
    new ResourceTemplate("fruit://{name}", {
      // Enable listing so Claude can discover available fruits
      list: async () => {
        return {
          resources: [
            {
              uri: "fruit://apple",
              name: "apple",
              title: "Apple",
              description: "Red sweet fruit",
              mimeType: "application/json",
            },
            {
              uri: "fruit://banana",
              name: "banana",
              title: "Banana",
              description: "Yellow sweet fruit",
              mimeType: "application/json",
            },
            {
              uri: "fruit://orange",
              name: "orange",
              title: "Orange",
              description: "Orange citrus fruit",
              mimeType: "application/json",
            },
          ],
        };
      },
    }),
    {
      title: "Fruit Info",
      description:
        "Dummy resource with fruit data. Pass URI as one of: fruit://apple, fruit://banana, fruit://orange",
      mimeType: "application/json",
    },
    async (uri, params) => {
      // `params` will include extracted template parameters (here { name })
      const name = params.name;
      const data = getFruitData(name as string);

      if (!data) {
        throw new Error(
          `Invalid fruit name: ${name}. Use one of: apple, banana, orange`,
        );
      }

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify({ name, ...data }, null, 2),
          },
        ],
      };
    },
  );
}
