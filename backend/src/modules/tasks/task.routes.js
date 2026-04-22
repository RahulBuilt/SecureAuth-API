const express = require("express");
const taskController = require("./task.controller");
const validate = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");
const { createTaskSchema, updateTaskSchema, taskIdParamSchema } = require("./task.schema");

const router = express.Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get tasks
 *   post:
 *     tags: [Tasks]
 *     summary: Create task
 */
router
  .route("/")
  .get(authMiddleware, taskController.getTasks)
  .post(authMiddleware, validate(createTaskSchema), taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task by id
 *   patch:
 *     tags: [Tasks]
 *     summary: Update task
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task
 */
router
  .route("/:id")
  .get(authMiddleware, validate(taskIdParamSchema), taskController.getTaskById)
  .patch(authMiddleware, validate(updateTaskSchema), taskController.updateTask)
  .delete(authMiddleware, validate(taskIdParamSchema), taskController.deleteTask);

module.exports = router;
