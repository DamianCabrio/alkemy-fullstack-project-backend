class ApiError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new ApiError(message, 400);
  }

  static internalServerError(
    message = 'Algo salio mal, por favor vuelva a intentar'
  ) {
    return new ApiError(message, 500);
  }

  static notFound(message = 'Operación no encontrada') {
    return new ApiError(message, 404);
  }
}

export default ApiError;
