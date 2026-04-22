const authService = require("./auth.service");
const { sendSuccess } = require("../../utils/apiResponse");

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async (req, res, next) => {
  try {
    const { body } = req.validated;
    const { user, token } = await authService.register(body);
    return sendSuccess(res, 201, "User registered successfully", {
      user: safeUser(user),
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req.validated;
    const { user, token } = await authService.login(body);
    return sendSuccess(res, 200, "Login successful", {
      user: safeUser(user),
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
