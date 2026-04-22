const Task = require("./task.model");
const User = require("../users/user.model");
const ApiError = require("../../utils/apiError");
const { sendSuccess } = require("../../utils/apiResponse");

const createTask = async (req, res, next) => {
  try {
    const { body } = req.validated;
    const task = await Task.create({
      ...body,
      owner: req.user._id,
    });
    return sendSuccess(res, 201, "Task created successfully", task);
  } catch (error) {
    return next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { owner: req.user._id };
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return sendSuccess(res, 200, "Tasks fetched successfully", tasks);
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not allowed to access this task");
    }
    return sendSuccess(res, 200, "Task fetched successfully", task);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not allowed to update this task");
    }

    Object.assign(task, req.validated.body);
    await task.save();
    return sendSuccess(res, 200, "Task updated successfully", task);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");
    if (req.user.role !== "admin" && task.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not allowed to delete this task");
    }
    await task.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const listUsers = async (_req, res, next) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return sendSuccess(res, 200, "Users fetched successfully", users);
  } catch (error) {
    return next(error);
  }
};

const adminDeleteTask = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const task = await Task.findById(id);
    if (!task) throw new ApiError(404, "Task not found");
    await task.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  listUsers,
  adminDeleteTask,
};
