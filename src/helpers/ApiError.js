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

  static notFound(message = 'No se encontró el recurso solicitado') {
    return new ApiError(message, 404);
  }

  static unauthorized(message = 'No tienes permisos para realizar esta acción') {
    return new ApiError(message, 401);
  }

  static forbidden(message = 'No tienes permisos para realizar esta acción') {
    return new ApiError(message, 403);
  }
}

export default ApiError;
