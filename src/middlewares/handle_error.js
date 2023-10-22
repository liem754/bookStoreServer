import createError from "http-errors";

export const handleError = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: -1,
    mes: error.message,
  });
};
export const handleNotFound = (req, res) => {
  const error = createError.NotFound("This route is not defined");
  return res.status(error.status).json({
    err: -1,
    mes: error.message,
  });
};
export const handleServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: -1,
    mes: error.message,
  });
};
export const handleNotAuth = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(error.status).json({
    err: -1,
    mes: error.message,
  });
};
