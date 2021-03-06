const postController = require('../../server/controllers/postController');
const postModel = require('../../server/models/postModel');
const categoryModel = require('../../server/models/categoryModel');
const httpMocks = require('node-mocks-http');
const newPost = require('../data/new-post.json');
const allPosts = require('../data/all-posts.json');

postModel.create = jest.fn();
postModel.find = jest.fn();
postModel.findById = jest.fn();
postModel.findByIdAndUpdate = jest.fn();
postModel.findByIdAndDelete = jest.fn();

categoryModel.create = jest.fn();
categoryModel.findOne = jest.fn();

const postId = '5fcb556fb94b28d87d5977ec';
const updatedPost = { title: 'updated title', body: 'Updated body' };

// beforeEach() means run a function before each of the tests in this file runs.
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Post controller create', () => {
  beforeEach(() => {
    req.body = newPost;
  });
  it('should have a createPost function', () => {
    expect(typeof postController.createPost).toBe('function');
  });
  it('should call postModel.create', async () => {
    await postController.createPost(req, res);
    expect(postModel.create).toBeCalledWith(newPost);
    expect(categoryModel.findOne).toBeCalledWith({ slug: req.body.category });
  });
  it('should return 201 response code', async () => {
    await postController.createPost(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    postModel.create.mockReturnValue(newPost);
    await postController.createPost(req, res);
    expect(res._getJSONData()).toStrictEqual(newPost);
  });
});

describe('Post controller get all posts', () => {
  it('should have a getPosts function', () => {
    expect(typeof postController.getPosts).toBe('function');
  });
  it('should call postModel.find({})', async () => {
    await postController.getPosts(req, res);
    expect(postModel.find).toHaveBeenCalledWith({});
  });
  it('should return 200 response', async () => {
    postModel.find.mockReturnValue(allPosts);
    await postController.getPosts(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    postModel.find.mockReturnValue(allPosts);
    await postController.getPosts(req, res);
    expect(res._getJSONData()).toStrictEqual(allPosts);
  });
  it("should return 404 when item doesn't exist", async () => {
    postModel.find.mockReturnValue(null);
    await postController.getPosts(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Post controller getPostById', () => {
  it('should have a get function', () => {
    expect(typeof postController.getPostById).toBe('function');
  });
  it('should call postModel.findById', async () => {
    req.params.id = postId;
    await postController.getPostById(req, res);
    expect(postModel.findById).toBeCalledWith(postId);
  });
  it('should return json body and response code 200', async () => {
    postModel.findById.mockReturnValue(newPost);
    await postController.getPostById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newPost);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return 404 when item doesn't exist", async () => {
    postModel.findById.mockReturnValue(null);
    await postController.getPostById(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Post controller update', () => {
  it('should have an updatePost function', () => {
    expect(typeof postController.updatePost).toBe('function');
  });
  it('shold call postModel.findByIdAndUpdate', async () => {
    req.params.id = postId;
    req.body = updatedPost;
    await postController.updatePost(req, res);
    expect(postModel.findByIdAndUpdate).toHaveBeenCalledWith(
      postId,
      updatedPost,
      { new: true }
    );
  });
  it('should return json body and response code 200', async () => {
    req.params.id = postId;
    req.body = updatedPost;
    postModel.findByIdAndUpdate.mockReturnValue(updatedPost);
    await postController.updatePost(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedPost);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    postModel.findByIdAndUpdate.mockReturnValue(null);
    await postController.updatePost(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('Post controller delete', () => {
  it('should have a deletePost function', () => {
    expect(typeof postController.deletePost).toBe('function');
  });
  it('should call postModel.findByIdAndDelete', async () => {
    req.params.id = postId;
    await postController.deletePost(req, res);
    expect(postModel.findByIdAndDelete).toBeCalledWith(postId);
  });

  it('should return 200 response', async () => {
    const deletedPost = {
      title: 'Deleted post',
      body: 'It is deleted',
    };
    postModel.findByIdAndDelete.mockReturnValue(deletedPost);
    await postController.deletePost(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedPost);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    postModel.findByIdAndDelete.mockReturnValue(null);
    await postController.deletePost(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
