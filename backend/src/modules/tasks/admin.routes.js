const express = require("express");
const taskController = require("./task.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware");
const { taskIdParamSchema } = require("./task.schema");

const router = express.Router();

router.get("/users", authMiddleware, allowRoles("admin"), taskController.listUsers);
router.delete(
  "/tasks/:id",
  authMiddleware,
  allowRoles("admin"),
  validate(taskIdParamSchema),
  taskController.adminDeleteTask
);

module.exports = router;
