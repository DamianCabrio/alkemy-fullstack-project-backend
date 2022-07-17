import { validationResult } from 'express-validator';
import ApiError from '../helpers/ApiError.js';

export function validateRequestSchema(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ApiError.badRequest(errors.array()));
    return;
  }
  next();
}
