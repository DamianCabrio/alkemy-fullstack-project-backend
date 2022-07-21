import ApiError from "../helpers/ApiError.js"

const notFoundMiddleware = (req, _res, next) => {
  return next(ApiError.notFound(`La ruta ${req.url} no existe`));
};

export default notFoundMiddleware;