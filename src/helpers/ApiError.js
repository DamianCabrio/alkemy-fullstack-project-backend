import { StatusCodes } from 'http-status-codes';

class ApiError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new ApiError(message, StatusCodes.BAD_REQUEST);
  }

  static internalServerError(
    message = 'Algo salio mal, por favor vuelva a intentar'
  ) {
    return new ApiError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  static notFound(message = 'No se encontró el recurso solicitado') {
    return new ApiError(message, StatusCodes.NOT_FOUND);
  }

  static unauthorized(
    message = 'No tienes permisos para realizar esta acción'
  ) {
    return new ApiError(message, StatusCodes.UNAUTHORIZED);
  }

  static forbidden(message = 'No tienes permisos para realizar esta acción') {
    return new ApiError(message, StatusCodes.FORBIDDEN);
  }
}

export default ApiError;
