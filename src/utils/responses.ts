export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export const createSuccessResponse = <T>(data: T): ApiSuccessResponse<T> => ({
  success: true,
  data,
});

export const createErrorResponse = (
  error: string,
  message: string,
  details?: unknown,
): ApiErrorResponse => ({
  success: false,
  error,
  message,
  ...(details !== undefined ? { details } : {}),
});

export const createValidationErrorResponse = (details?: unknown) =>
  createErrorResponse("VALIDATION_ERROR", "Request validation failed", details);

export const createNotFoundResponse = (resource?: string, id?: string) =>
  createErrorResponse(
    "NOT_FOUND",
    resource && id
      ? `${resource} with ID ${id} not found`
      : "Resource not found",
  );

export const createInternalErrorResponse = (error?: unknown) =>
  createErrorResponse(
    "INTERNAL_ERROR",
    error instanceof Error ? error.message : "Internal server error",
    error,
  );

export const createMethodNotAllowedResponse = (method?: string) =>
  createErrorResponse(
    "METHOD_NOT_ALLOWED",
    method
      ? `${method} method is not allowed for this endpoint`
      : "Method not allowed",
  );

export const createUnauthorizedResponse = (
  message = "Authentication required",
) => createErrorResponse("UNAUTHORIZED", message);

export const createForbiddenResponse = (message = "Access denied") =>
  createErrorResponse("FORBIDDEN", message);

export const createConflictResponse = (message = "Resource conflict") =>
  createErrorResponse("CONFLICT", message);

export const createTooManyRequestsResponse = (
  message = "Rate limit exceeded",
) => createErrorResponse("TOO_MANY_REQUESTS", message);

export const createBadRequestResponse = (
  message = "Bad request",
  details?: unknown,
) => createErrorResponse("BAD_REQUEST", message, details);

export const createNotImplementedResponse = (feature?: string) =>
  createErrorResponse(
    "NOT_IMPLEMENTED",
    feature
      ? `${feature} functionality is not yet implemented`
      : "Feature not implemented",
  );

export const isSuccessResponse = <T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> => response.success === true;

export const isErrorResponse = <T>(
  response: ApiResponse<T>,
): response is ApiErrorResponse => response.success === false;

// 🔹 Error code constants
export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  BAD_REQUEST: "BAD_REQUEST",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
