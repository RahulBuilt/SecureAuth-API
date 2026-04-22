const sanitizeObject = (value) => {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => sanitizeObject(item));

  const sanitized = {};
  Object.keys(value).forEach((key) => {
    const safeKey = key.replace(/\$/g, "").replace(/\./g, "");
    sanitized[safeKey] = sanitizeObject(value[key]);
  });
  return sanitized;
};

const sanitizeMiddleware = (req, _res, next) => {
  req.body = sanitizeObject(req.body);
  next();
};

module.exports = sanitizeMiddleware;
