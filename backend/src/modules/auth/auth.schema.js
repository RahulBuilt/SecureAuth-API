const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(50),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(6).max(100),
    role: z.enum(["user", "admin"]).optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(6).max(100),
  }),
  params: z.object({}),
  query: z.object({}),
});

module.exports = { registerSchema, loginSchema };
