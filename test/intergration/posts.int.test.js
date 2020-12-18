const request = require('supertest');
const app = require('../../server/index');
const newPost = require('../data/new-post.json');

let firstPost;

beforeEach(async () => {
  firstPost = await request(app).post('/api/posts').send(newPost);
});

describe('Testing posts API', () => {
  it('POST /api/posts', async () => {
    const response = await request(app).post('/api/posts').send(newPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.body).toBe(newPost.body);
  });

  it('should return 400 on POST /api/posts', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'error test' });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toStrictEqual("can't create post");
  });

  it('GET /api/posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].body).toBeDefined();
    expect(response.body[0].tags).toBeDefined();
  });

  it('GET /api/posts/:id', async () => {
    const response = await request(app).get('/api/posts/' + firstPost.body._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstPost.body.title);
    expect(response.body.body).toBe(firstPost.body.body);
  });

  it("GET id doesn't exist", async () => {
    const response = await request(app).get(
      '/api/posts/5fd1f88714446e78d19080b1'
    );
    expect(response.statusCode).toBe(404);
  });

  it('PUT /api/posts/:id', async () => {
    const response = await request(app)
      .put('/api/posts/' + firstPost.body._id)
      .send({ title: 'updated title', body: 'updated body' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('updated title');
    expect(response.body.body).toBe('updated body');
  });

  it('should return 404 on PUT /api/posts/:id', async () => {
    const response = await request(app)
      .put('/api/posts/5fd1f88714446e78d19080b1')
      .send({ title: 'updated title', body: 'updated body' });
    expect(response.statusCode).toBe(404);
  });

  it('DELETE /api/posts/:id', async () => {
    const response = await request(app)
      .delete('/api/posts/' + firstPost.body._id)
      .send();
    expect(response.statusCode).toBe(200);
  });

  it("DELETE id doesn't exist", async () => {
    const response = await request(app)
      .delete('/api/posts/5fd1f88714446e78d19080b1')
      .send();
    expect(response.statusCode).toBe(404);
  });
});
