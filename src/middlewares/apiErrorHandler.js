import '../helpers/loadEnv.js'

import { error } from '../helpers/responses.js';
import ApiError from '../helpers/ApiError.js';

function apiErrorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    let errMessage;
    if (Array.isArray(err.message)) {
      errMessage = err.message.map((message) => message.msg).join(', ');
    }

    error(res, errMessage || err.message, err.statusCode);
    return;
  }

  if(process.env.NODE_ENV === 'development') {
    console.log(err);
    error(res, err.message, 500);
    return;
  }

  error(res, 'Algo salio mal, por favor vuelva a intentar');
}

export default apiErrorHandler;
