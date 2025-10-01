import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createUnauthorizedResponse,
  createForbiddenResponse,
} from "../utils/responses.js";

export function bearerAuth(expectedToken: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      reply.code(401).send(createUnauthorizedResponse());
      return;
    }

    const token = authHeader.substring("Bearer ".length);

    if (token !== expectedToken) {
      reply.code(403).send(createForbiddenResponse("Invalid bearer token"));
      return;
    }
  };
}
