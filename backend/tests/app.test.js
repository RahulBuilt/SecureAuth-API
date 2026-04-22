const request = require("supertest");
const app = require("../src/app");

describe("API smoke tests", () => {
  it("should return healthy status", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject tasks endpoint without token", async () => {
    const response = await request(app).get("/api/v1/tasks");
    expect(response.statusCode).toBe(401);
  });
});
