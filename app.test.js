const request = require('supertest');
const app = require('./app');
const axios = require('axios');

describe('Test branch microservice with supertest', () => {
  test('GET /branch should return branch info if branch is found', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-location', 'london')
    expect(response.body.res.length).toBeGreaterThan(0)
  });
  test('GET /branch should return no results if branch is not found', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-location', 'asd');
    expect(response.body.res).toHaveLength(0);
  });
  test('GET /branch should return error if malformed or no header is received', async () => {
    const response = await request(app)
      .get('/branch')
      .set('lbg-txn-branch-locatio', 'london');
    expect(response.body.res).toEqual('invalid input');
    const response2 = await request(app).get('/branch');
    expect(response2.body.res).toEqual('invalid input');
  });
});