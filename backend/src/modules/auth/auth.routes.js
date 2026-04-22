const express = require("express");
const authController = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("./auth.schema");

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 */
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
