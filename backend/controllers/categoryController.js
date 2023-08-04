import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

/***
 * @description Get all categories
 * @route GET /api/category
 * @access Public
 */
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

/***
 * @description Get category
 * @route GET /api/category
 * @access Public
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json(category);
});

/***
 * @description Create category
 * @route GET /api/category
 * @access Private / Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
  });

  res.status(200).json(category);
});

/***
 * @description Update category
 * @route PATCH /api/category/:id
 * @access Private / Admin
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category Not Found');
  }

  category.name = name;

  const updatedCategory = await category.save();

  res.status(200).json(updatedCategory);
});

/***
 * @description Delete category
 * @route DELETE /api/category/:id
 * @access Private / Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category Not Found');
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({});
});

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
