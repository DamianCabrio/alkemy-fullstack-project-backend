import { error } from '../helpers/responses.js';
import ApiError from '../helpers/ApiError.js';

function apiErrorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(error(err.message, err.status));
    return;
  }

  res
    .status(500)
    .json(error('Algo salio mal, por favor vuelva a intentar', 500));
}

export default apiErrorHandler;
