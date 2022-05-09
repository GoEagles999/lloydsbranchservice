const request = require('supertest');
const app = require('./app');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

describe('Test branch microservice', () => {
  test('GET /branch should return 200 with branch info if branch is found', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-location', 'london');
    expect(response.statusCode).toBe(200);
  });
  test('GET /branch should return 404 if branch is not found', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-location', 'kidderminster');
    expect(response.statusCode).toBe(404);
  });
  test('GET /branch should return 400 if malformed or no header is received', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-locatio', 'london');
    expect(response.statusCode).toBe(400);
    const response2 = await request(app).get('/branch');
    expect(response2.statusCode).toBe(400);
  });
  test('Using axios-mock', async () => {
    mockAxios
      .onGet(`localhost:3000/branch`, undefined, {
        'lbg-txn-branch-location': 'london',
      })
      .reply(200);
  });
});
