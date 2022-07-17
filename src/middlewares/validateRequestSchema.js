import { validationResult } from 'express-validator';
import { error } from '../helpers/responses.js';

export function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(error(errors.array(), 422));
  }
  next();
}
