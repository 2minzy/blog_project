const request = require('supertest');
const app = require('../../server/index');
const newUser = require('../data/new-user.json');

let firstUser;

it('POST /api/users', async () => {
  const response = await request(app).post('/api/users').send(newUser);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newUser.name);
  expect(response.body.email).toBe(newUser.email);
  expect(response.body.role).toBe(newUser.role);
});

it('should return 400 on POST /api/users', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({ name: 'error name', email: 'err@example.com' });
  expect(response.statusCode).toBe(400);
  expect(response.body.message).toStrictEqual('Invalid user data');
});

it('GET /api/users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].email).toBeDefined();
  expect(response.body[0].role).toBeDefined();
  firstUser = response.body[0];
});

it('GET /api/users/:id', async () => {
  const response = await request(app).get('/api/users/' + firstUser._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstUser.name);
  expect(response.body.email).toBe(firstUser.email);
  expect(response.body.role).toBe(firstUser.role);
});

it("GET id doesn't exist", async () => {
  const response = await request(app).get(
    '/api/users/5fd0fe7ca67c4e6989b10e0w'
  );
  expect(response.statusCode).toBe(404);
});

it('PUT /api/users/:id', async () => {
  const response = await request(app)
    .put('/api/users/' + firstUser._id)
    .send({ name: 'updated name', email: 'updated@exmaple.com' });
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('updated name');
  expect(response.body.email).toBe('updated@exmaple.com');
});

it("id doesn't exist PUT /api/users/:id", async () => {
  const response = await request(app)
    .put('/api/users/5fd0fe7ca67c4e6989b10e0w')
    .send({ name: 'updated name', email: 'updated@exmaple.com' });
  expect(response.statusCode).toBe(404);
});

it('DELETE /api/users/:id', async () => {
  const response = await request(app)
    .delete('/api/users/' + firstUser._id)
    .send();
  expect(response.statusCode).toBe(200);
});

it("DELETE id doesn't exist", async () => {
  const response = await request(app)
    .delete('/api/users/' + firstUser._id)
    .send();
  expect(response.statusCode).toBe(404);
});
