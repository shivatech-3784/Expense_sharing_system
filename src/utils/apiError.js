class ApiError extends Error {
  constructor(statuscode, message = "Something went wrong", errors = []) {
    super(message);
    this.statuscode = statuscode;
    this.errors = errors;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

