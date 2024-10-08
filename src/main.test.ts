import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from './main.js';

describe('GET /', () => {
  it('should respond with "Hello World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
