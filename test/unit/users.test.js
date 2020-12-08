const userController = require('../../server/controllers/userController');
const userModel = require('../../server/models/userModel');
const httpMocks = require('node-mocks-http');
const newUser = require('../data/new-user.json');
const allUsers = require('../data/all-users.json');

userModel.create = jest.fn();
userModel.find = jest.fn();
userModel.findOne = jest.fn();
userModel.findById = jest.fn();
userModel.findByIdAndUpdate = jest.fn();
userModel.findByIdAndDelete = jest.fn();

const userId = '5fcb556fb94b28d87d5977ec';
const updatedUser = {
  name: 'updated user name',
  email: 'test@gmail.com',
  pasword: 'test123456',
  role: 'admin',
};

// beforeEach() means run a function before each of the tests in this file runs.
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('User controller create', () => {
  beforeEach(() => {
    req.body = newUser;
  });
  it('should have a createUser function', () => {
    expect(typeof userController.createUser).toBe('function');
  });
  it('should call userModel.create', async () => {
    await userController.createUser(req, res);
    expect(userModel.findOne).toBeCalledWith({ email: newUser.email });
    expect(userModel.create).toBeCalledWith(newUser);
  });
  it('should return 201 response code', async () => {
    userModel.create.mockReturnValue(newUser);
    await userController.createUser(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    userModel.create.mockReturnValue(newUser);
    await userController.createUser(req, res);
    expect(res._getJSONData()).not.toHaveProperty('password');
  });
});

describe('User controller get all users', () => {
  it('should have a getUsers function', () => {
    expect(typeof userController.getUsers).toBe('function');
  });
  it('should call userModel.find({})', async () => {
    await userController.getUsers(req, res);
    expect(userModel.find).toHaveBeenCalledWith({});
  });
  it('should return 200 response', async () => {
    userModel.find.mockReturnValue(allUsers);
    await userController.getUsers(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    userModel.find.mockReturnValue(allUsers);
    await userController.getUsers(req, res);
    expect(res._getJSONData()).toStrictEqual(allUsers);
  });
  it("should return 404 when item doesn't exist", async () => {
    userModel.find.mockReturnValue(null);
    await userController.getUsers(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('User controller getPostById', () => {
  it('should have a get function', () => {
    expect(typeof userController.getUserById).toBe('function');
  });
  it('should call userModel.findById', async () => {
    const select = jest.fn();
    userModel.findById.mockReturnValue({ select });
    req.params.id = userId;
    await userController.getUserById(req, res);
    expect(userModel.findById).toBeCalledWith(userId);
    expect(select).toBeCalledWith('-password');
  });
  it('should return json body and response code 200', async () => {
    const select = jest.fn();
    userModel.findById.mockReturnValue({ select });
    select.mockReturnValue(newUser);
    await userController.getUserById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newUser);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return 404 when item doesn't exist", async () => {
    const select = jest.fn();
    userModel.findById.mockReturnValue({ select });
    select.mockReturnValue(null);
    await userController.getUserById(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});
