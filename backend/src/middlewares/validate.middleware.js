const ApiError = require("../utils/apiError");

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const firstError = result.error.issues[0];
    return next(new ApiError(422, firstError.message));
  }

  req.validated = result.data;
  return next();
};

module.exports = validate;
