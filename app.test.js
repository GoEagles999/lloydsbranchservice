const request = require('supertest');
const app = require('./app');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

describe('Test branch microservice', () => {
  test('GET /branch should return 200 with branch info if branch is found', async () => {
  });
  test('GET /branch should return 404 if branch is not found', async () => {
  });
  test('GET /branch should return 400 if malformed or no header is received', async () => {
  });
  test('Using axios-mock', async () => {
  });
});
