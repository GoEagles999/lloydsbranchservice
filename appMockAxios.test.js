const request = require('supertest');
const app = require('./app');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

describe('Test branch microservice with mock axios adapter', () => {
  test('Using axios-mock', async () => {
    mockAxios
      .onGet(`localhost:3000/branch`, undefined, {
        'lbg-txn-branch-location': 'london',
      })
      .reply(200);
  });
})