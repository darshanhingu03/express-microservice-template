// test/integration/api.test.js
import request from 'supertest';
import express from 'express';

// Import your Express app or create a mini-app for testing.
const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

describe('GET /health', () => {
  test('should respond with status 200 and JSON', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
});
