const request = require("supertest");
const app = require("../../app/App"); // Import your Express app here

describe("GET /api/data", () => {
  it("should respond with a 200 status and JSON data", async () => {
    const response = await request(app).get(
      "http://10.0.2.2:3000/api/leaderboard"
    );

    expect(response.status).toBe(200);
  });
});
