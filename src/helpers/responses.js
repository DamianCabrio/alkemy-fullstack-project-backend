import { StatusCodes } from 'http-status-codes';

export const success = (res, data, msg, status = StatusCodes.OK) => {
  res.status(status).json({
    status: status,
    result: data,
    message: msg,
    error: false,
  });
};

export const error = (res, msg, status = StatusCodes.INTERNAL_SERVER_ERROR) => {
  res.status(status).json({
    status: status,
    result: null,
    message: msg,
    error: true,
  });
};
