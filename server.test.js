const request = require('supertest');
const server = require('./server');

describe('GET /', function() {
  test('responds with json', function() {
    request(server)
      .get('/')
      .expect(200);
  });
});
