const postController = require('../../server/controllers/postController');
const postModel = require('../../server/models/postModel');
const httpMocks = require('node-mocks-http');
const newPost = require('../data/new-post.json');

postModel.create = jest.fn();

// Runs a function before each of the tests in this file runs.
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Post Controller Create', () => {
  beforeEach(() => {
    req.body = newPost;
  });
  it('should have a createPost function', () => {
    expect(typeof postController.createPost).toBe('function');
  });
  it('should call postModel.create', async () => {
    await postController.createPost(req, res);
    expect(postModel.create).toBeCalledWith(newPost);
  });
  it('should return 201 response code', async () => {
    await postController.createPost(req, res);
    expect(res.statusCode).toEqual(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    postModel.create.mockReturnValue(newPost);
    await postController.createPost(req, res);
    expect(res._getJSONData()).toStrictEqual(newPost);
  });
});
