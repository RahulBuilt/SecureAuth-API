const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../modules/users/user.model");
const ApiError = require("../utils/apiError");

const authMiddleware = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token is required");
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).select("-password");
    if (!user) {
      throw new ApiError(401, "User does not exist");
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error.name === "JsonWebTokenError" ? new ApiError(401, "Invalid token") : error);
  }
};

module.exports = authMiddleware;
