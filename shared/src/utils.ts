/**
 * Create a standardized API response
 */
export function createApiResponse<T>(
  success: boolean,
  data?: T,
  error?: string,
  message?: string
) {
  return {
    success,
    data,
    error,
    message,
  };
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(data: T, message?: string) {
  return createApiResponse(true, data, undefined, message);
}

/**
 * Create an error response
 */
export function createErrorResponse(error: string, message?: string) {
  return createApiResponse(false, undefined, error, message);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}