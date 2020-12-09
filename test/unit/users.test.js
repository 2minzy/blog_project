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
  _id: '5fcb556fb94b28d87d5977ec',
  name: 'Updated user name',
  email: 'test@gmail.com',
  role: 'admin',
};
const userProfile = {
  _id: '5fcb556fb94b28d87d5977ec',
  name: 'Updated user name',
  email: 'test@gmail.com',
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

describe('User controller getUserById', () => {
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

describe('User controller update', () => {
  it('should have an updateUser function', () => {
    expect(typeof userController.updateUser).toBe('function');
  });
  it('should call userModel.findById', async () => {
    req.params.id = userId;
    await userController.updateUser(req, res);
    expect(userModel.findById).toHaveBeenCalledWith(userId);
  });
  it('should return json body and response code 200', async () => {
    const save = jest.fn();
    userModel.findById.mockReturnValue({ save });
    req.body = updatedUser;
    save.mockReturnValue(updatedUser);
    await userController.updateUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedUser);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    userModel.findById.mockReturnValue(null);
    await userController.updateUser(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('User controller delete', () => {
  it('should have a deleteUser function', () => {
    expect(typeof userController.deleteUser).toBe('function');
  });
  it('should call userModel.findByIdAndDelete', async () => {
    req.params.id = userId;
    await userController.deleteUser(req, res);
    expect(userModel.findByIdAndDelete).toBeCalledWith(userId);
  });
  it('should return 200 response', async () => {
    const deletedUser = {
      _id: 'dscsnvnsnvsk',
      name: 'Deleted user name',
      email: 'Deleted email',
      role: 'admin',
    };
    userModel.findByIdAndDelete.mockReturnValue(deletedUser);
    await userController.deleteUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedUser);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    userModel.findByIdAndDelete.mockReturnValue(null);
    await userController.deleteUser(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
