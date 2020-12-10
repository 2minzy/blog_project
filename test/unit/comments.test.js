const commentController = require('../../server/controllers/commentController');
const commentModel = require('../../server/models/commentModel');
const httpMocks = require('node-mocks-http');
const newComment = require('../data/new-comment.json');
const allComments = require('../data/all-comments.json');

commentModel.create = jest.fn();
commentModel.find = jest.fn();
commentModel.findById = jest.fn();
commentModel.findByIdAndUpdate = jest.fn();
commentModel.findByIdAndDelete = jest.fn();

const commentId = '5fcb556fb94b28d87d5977ec';
const updatedComment = { name: 'updated name', title: 'Updated title' };

// beforeEach() means run a function before each of the tests in this file runs.
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Comment controller create', () => {
  beforeEach(() => {
    req.body = newComment;
  });
  it('should have a createComment function', () => {
    expect(typeof commentController.createComment).toBe('function');
  });
  it('should call commentModel.create', async () => {
    await commentController.createComment(req, res);
    expect(commentModel.create).toBeCalledWith(newComment);
  });
  it('should return 201 response code', async () => {
    await commentController.createComment(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    commentModel.create.mockReturnValue(newComment);
    await commentController.createComment(req, res);
    expect(res._getJSONData()).toStrictEqual(newComment);
  });
});

describe('Comment controller get all comments', () => {
  it('should have a getComments function', () => {
    expect(typeof commentController.getComments).toBe('function');
  });
  it('should call commentModel.find({})', async () => {
    await commentController.getComments(req, res);
    expect(commentModel.find).toHaveBeenCalledWith({});
  });
  it('should return 200 response', async () => {
    commentModel.find.mockReturnValue(allComments);
    await commentController.getComments(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    commentModel.find.mockReturnValue(allComments);
    await commentController.getComments(req, res);
    expect(res._getJSONData()).toStrictEqual(allComments);
  });
  it("should return 404 when item doesn't exist", async () => {
    commentModel.find.mockReturnValue(null);
    await commentController.getComments(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Comment controller getCommentById', () => {
  it('should have a getCommentById function', () => {
    expect(typeof commentController.getCommentById).toBe('function');
  });
  it('should call commentModel.findById', async () => {
    req.params.id = commentId;
    await commentController.getCommentById(req, res);
    expect(commentModel.findById).toBeCalledWith(commentId);
  });
  it('should return json body and response code 200', async () => {
    commentModel.findById.mockReturnValue(newComment);
    await commentController.getCommentById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newComment);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return 404 when item doesn't exist", async () => {
    commentModel.findById.mockReturnValue(null);
    await commentController.getCommentById(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Comment controller update', () => {
  it('should have an commentCategory function', () => {
    expect(typeof commentController.updateComment).toBe('function');
  });
  it('shold call commentModel.findByIdAndUpdate', async () => {
    req.params.id = commentId;
    req.body = updatedComment;
    await commentController.updateComment(req, res);
    expect(commentModel.findByIdAndUpdate).toHaveBeenCalledWith(
      commentId,
      updatedComment,
      { new: true }
    );
  });
  it('should return json body and response code 200', async () => {
    req.params.id = commentId;
    req.body = updatedComment;
    commentModel.findByIdAndUpdate.mockReturnValue(updatedComment);
    await commentController.updateComment(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedComment);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    commentModel.findByIdAndUpdate.mockReturnValue(null);
    await commentController.updateComment(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('Cateogry controller delete', () => {
  it('should have a deleteComment function', () => {
    expect(typeof commentController.deleteComment).toBe('function');
  });
  it('should call commentModel.findByIdAndDelete', async () => {
    req.params.id = commentId;
    await commentController.deleteComment(req, res);
    expect(commentModel.findByIdAndDelete).toBeCalledWith(commentId);
  });
  it('should return 200 response', async () => {
    const deletedComment = {
      name: 'Deleted name',
      title: 'It is deleted',
    };
    commentModel.findByIdAndDelete.mockReturnValue(deletedComment);
    await commentController.deleteComment(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedComment);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    commentModel.findByIdAndDelete.mockReturnValue(null);
    await commentController.deleteComment(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
