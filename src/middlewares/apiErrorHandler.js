import { error } from '../helpers/responses.js';
import ApiError from '../helpers/ApiError.js';

function apiErrorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    error(res, err.message, err.statusCode);
    return;
  }
  error(res, 'Algo salio mal, por favor vuelva a intentar');
}

export default apiErrorHandler;