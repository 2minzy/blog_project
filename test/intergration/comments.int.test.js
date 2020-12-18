const request = require('supertest');
const app = require('../../server/index');
const newComment = require('../data/new-comment.json');

let firstComment;

beforeEach(async () => {
  firstComment = await request(app).post('/api/comments').send(newComment);
});

describe('Testing comments API', () => {
  it('POST /api/comments', async () => {
    const response = await request(app).post('/api/comments').send(newComment);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newComment.name);
    expect(response.body.email).toBe(newComment.email);
    expect(response.body.title).toBe(newComment.title);
    expect(response.body.body).toBe(newComment.body);
  });

  it('should return 400 on POST /api/comments', async () => {
    const response = await request(app)
      .post('/api/comments')
      .send({ name: 'error test' });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toStrictEqual("Can't create comment");
  });

  it('GET /api/comments', async () => {
    const response = await request(app).get('/api/comments');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].email).toBeDefined();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].body).toBeDefined();
  });

  it('GET /api/comments/:id', async () => {
    const response = await request(app).get(
      '/api/comments/' + firstComment.body._id
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstComment.body.name);
    expect(response.body.email).toBe(firstComment.body.email);
    expect(response.body.title).toBe(firstComment.body.title);
    expect(response.body.body).toBe(firstComment.body.body);
  });

  it("GET id doesn't exist", async () => {
    const response = await request(app).get(
      '/api/comments/5fcbc3fb28a8e900bd42e8ea'
    );
    expect(response.statusCode).toBe(404);
  });

  it('PUT /api/comments/:id', async () => {
    const response = await request(app)
      .put('/api/comments/' + firstComment.body._id)
      .send({ name: 'updated name', title: 'updated title' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('updated name');
    expect(response.body.title).toBe('updated title');
  });

  it('should return 404 on PUT /api/comments/:id', async () => {
    const response = await request(app)
      .put('/api/comments/5fcb5078691f7cd4381fdd05')
      .send({ name: 'updated name', title: 'updated title' });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /api/comments/:id', async () => {
    const response = await request(app)
      .delete('/api/comments/' + firstComment.body._id)
      .send();
    expect(response.statusCode).toBe(200);
  });

  it("DELETE id doesn't exist", async () => {
    const response = await request(app)
      .delete('/api/comments/5fcb5078691f7cd4381fdd05')
      .send();
    expect(response.statusCode).toBe(404);
  });
});
