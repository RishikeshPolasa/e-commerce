class ValidationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ValidationError";
  }
}

class AuthorizationError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AuthorizationError";
  }
}

class ServerNotFoundError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ServerNotFoundError";
  }
}

class ForbiddenError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ForbiddenError";
  }
}

export {
  ValidationError,
  AuthorizationError,
  ServerNotFoundError,
  ForbiddenError,
};
