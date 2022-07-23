import jwt from 'jsonwebtoken';

import ApiError from '../helpers/ApiError.js';

const authToken = (req, _res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1];

  if (token == null) return next(ApiError.unauthorized());

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(ApiError.forbidden());
    req.user = user;
    next();
  });
};

export default authToken;
