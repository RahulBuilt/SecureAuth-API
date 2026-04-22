const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task id");

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).max(120),
    description: z.string().trim().max(1000).optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

const updateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(1).max(120).optional(),
      description: z.string().trim().max(1000).optional(),
      status: z.enum(["todo", "in_progress", "done"]).optional(),
    })
    .refine((value) => Object.keys(value).length > 0, "At least one field is required"),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});

const taskIdParamSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: objectIdSchema,
  }),
  query: z.object({}),
});

module.exports = { createTaskSchema, updateTaskSchema, taskIdParamSchema };
