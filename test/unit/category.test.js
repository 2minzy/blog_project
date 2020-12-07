const categoryController = require('../../server/controllers/categoryController');
const categoryModel = require('../../server/models/categoryModel');
const httpMocks = require('node-mocks-http');
const newCategory = require('../data/new-category.json');
const allCategories = require('../data/all-categories.json');

categoryModel.create = jest.fn();
categoryModel.find = jest.fn();
categoryModel.findById = jest.fn();
categoryModel.findByIdAndUpdate = jest.fn();
categoryModel.findByIdAndDelete = jest.fn();

const categoryId = '5fcbbaa7111d60fd6937a1c4';
const updatedCategory = { name: 'updated name', slug: 'updated-slug' };

// beforeEach() means run a function before each of the tests in this file runs.
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Category controller create', () => {
  beforeEach(() => {
    req.body = newCategory;
  });
  it('should have a createCategory function', () => {
    expect(typeof categoryController.createCategory).toBe('function');
  });
  it('should call categoryModel.create', async () => {
    await categoryController.createCategory(req, res);
    expect(categoryModel.create).toBeCalledWith(newCategory);
  });
  it('should return 201 response code', async () => {
    await categoryController.createCategory(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    categoryModel.create.mockReturnValue(newCategory);
    await categoryController.createCategory(req, res);
    expect(res._getJSONData()).toStrictEqual(newCategory);
  });
});

describe('Category controller get all cateogries', () => {
  it('should have a getCategories function', () => {
    expect(typeof categoryController.getCategories).toBe('function');
  });
  it('should call categoryModel.find({})', async () => {
    await categoryController.getCategories(req, res);
    expect(categoryModel.find).toHaveBeenCalledWith({});
  });
  it('should return 200 response', async () => {
    categoryModel.find.mockReturnValue(allCategories);
    await categoryController.getCategories(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    categoryModel.find.mockReturnValue(allCategories);
    await categoryController.getCategories(req, res);
    expect(res._getJSONData()).toStrictEqual(allCategories);
  });
  it("should return 404 when item doesn't exist", async () => {
    categoryModel.find.mockReturnValue(null);
    await categoryController.getCategories(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Cateogory controller getPostById', () => {
  it('should have a getCategoryById function', () => {
    expect(typeof categoryController.getCategoryById).toBe('function');
  });
  it('should call categoryModel.findById', async () => {
    req.params.id = categoryId;
    await categoryController.getCategoryById(req, res);
    expect(categoryModel.findById).toBeCalledWith(categoryId);
  });
  it('should return json body and response code 200', async () => {
    categoryModel.findById.mockReturnValue(newCategory);
    await categoryController.getCategoryById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newCategory);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return 404 when item doesn't exist", async () => {
    categoryModel.findById.mockReturnValue(null);
    await categoryController.getCategoryById(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});

describe('Category controller update', () => {
  it('should have an updateCategory function', () => {
    expect(typeof categoryController.updateCategory).toBe('function');
  });
  it('shold call categoryModel.findByIdAndUpdate', async () => {
    req.params.id = categoryId;
    req.body = updatedCategory;
    await categoryController.updateCategory(req, res);
    expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
      categoryId,
      updatedCategory,
      { new: true }
    );
  });
  it('should return json body and response code 200', async () => {
    req.params.id = categoryId;
    req.body = updatedCategory;
    categoryModel.findByIdAndUpdate.mockReturnValue(updatedCategory);
    await categoryController.updateCategory(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedCategory);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    categoryModel.findByIdAndUpdate.mockReturnValue(null);
    await categoryController.updateCategory(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('Cateogry controller delete', () => {
  it('should have a deleteCategory function', () => {
    expect(typeof categoryController.deleteCategory).toBe('function');
  });
  it('should call categoryModel.findByIdAndDelete', async () => {
    req.params.id = categoryId;
    await categoryController.deleteCategory(req, res);
    expect(categoryModel.findByIdAndDelete).toBeCalledWith(categoryId);
  });
  it('should return 200 response', async () => {
    const deletedCategory = {
      name: 'Deleted category',
      slug: 'It is deleted',
    };
    categoryModel.findByIdAndDelete.mockReturnValue(deletedCategory);
    await categoryController.deleteCategory(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedCategory);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesn't exist", async () => {
    categoryModel.findByIdAndDelete.mockReturnValue(null);
    await categoryController.deleteCategory(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
