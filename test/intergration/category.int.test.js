const request = require('supertest');
const app = require('../../server/index');
const newCategory = require('../data/new-category.json');
const Category = require('../../server/models/categoryModel');

let firstCategory;

beforeEach(async () => {
  await Category.remove({});
  firstCategory = await request(app)
    .post('/api/category')
    .send({ name: 'USA Travel', slug: 'usa-travel' });
});

describe('Testing category API', () => {
  it('POST /api/category', async () => {
    const response = await request(app).post('/api/category').send(newCategory);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newCategory.name);
    expect(response.body.slug).toBe(newCategory.slug);
  });

  it('should return 400 on POST /api/category', async () => {
    const response = await request(app)
      .post('/api/category')
      .send({ slug: 'error test' });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toStrictEqual("can't create category");
  });

  it('GET /api/category', async () => {
    const response = await request(app).get('/api/category');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
  });

  it('GET /api/category/:id', async () => {
    const response = await request(app).get(
      '/api/category/' + firstCategory.body._id
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstCategory.body.name);
    expect(response.body.slug).toBe(firstCategory.body.slug);
  });

  it("GET id doesn't exist", async () => {
    const response = await request(app).get(
      '/api/category/5fcbc3fb28a8e900bd42e8ea'
    );
    expect(response.statusCode).toBe(404);
  });

  it('PUT /api/category/:id', async () => {
    const response = await request(app)
      .put('/api/category/' + firstCategory.body._id)
      .send({ name: 'updated name', slug: 'updated slug' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('updated name');
    expect(response.body.slug).toBe('updated slug');
  });

  it('should return 404 on PUT /api/category/:id', async () => {
    const response = await request(app)
      .put('/api/category/5fcbc3fb28a8e900bd42e8ea')
      .send({ name: 'updated name', slug: 'updated slug' });
    expect(response.statusCode).toBe(404);
  });

  it('DELETE /api/category/:id', async () => {
    const response = await request(app)
      .delete('/api/category/' + firstCategory.body._id)
      .send();
    expect(response.statusCode).toBe(200);
  });

  it("DELETE id doesn't exist", async () => {
    const response = await request(app)
      .delete('/api/category/5fcbc3fb28a8e900bd42e8ea')
      .send();
    expect(response.statusCode).toBe(404);
  });
});
