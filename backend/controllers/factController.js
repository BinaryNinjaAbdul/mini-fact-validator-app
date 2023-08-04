import asyncHandler from 'express-async-handler';
import Fact from '../models/factModel.js';

/***
 * @description Get all fact
 * @route GET /api/fact/
 * @access PUBLIC
 */
const getAllFacts = asyncHandler(async (req, res) => {
  const facts = await Fact.find();

  res.status(200).json(facts);
});

/***
 * @description Get facts based on category
 * @route GET /api/fact/
 * @access PUBLIC
 */
const getFactsByCategory = asyncHandler(async (req, res) => {
  const { id: category } = req.params;

  const facts = await Fact.find({ category });

  res.status(200).json(facts);
});

/***
 * @description Get facts by id
 * @route GET /api/fact/
 * @access PUBLIC
 */
const getFactsById = asyncHandler(async (req, res) => {
  const { category, id } = req.params;

  const fact = await Fact.findOne({ category, _id: id });

  res.status(200).json(fact);
});

/***
 * @description Create fact based on category
 * @route POST /api/fact/:category
 * @access Private
 */
const createFact = asyncHandler(async (req, res) => {
  const { fact, category } = req.body;

  if (!fact || !category) {
    res.status(401);
    throw new Error('Please enter valid data to continue');
  }

  const newFact = await Fact.create({
    user: req.user._id,
    fact,
    category,
  });

  res.status(200).json(newFact);
});

/***
 * @description Update fact
 * @route PATCH /api/fact/:id
 * @access Private
 */
const updatedFact = asyncHandler(async (req, res) => {
  const { fact } = req.body;

  const factExit = await Fact.findById(req.params.id);

  if (!factExit || !factExit.user.equals(req.user._id)) {
    res.status(404);
    throw new Error('Error while updating fact');
  }

  factExit.fact = fact || factExit.fact;
  factExit.likes = [];
  factExit.dislikes = [];

  const updatedFact = await factExit.save();

  res.status(200).json(updatedFact);
});

/***
 * @description Fact dislike
 * @route PATCH /api/fact/:id
 * @access Private
 */
const likeToggle = asyncHandler(async (req, res) => {
  const factExit = await Fact.findById(req.params.id);

  if (!factExit) {
    res.status(404);
    throw new Error('No fact found');
  }

  let alreadyLiked = -1;
  for (let i = 0; i < factExit.likes.length; i++) {
    if (factExit.likes[i].equals(req.user._id)) {
      alreadyLiked = i;
      break;
    }
  }

  if (alreadyLiked !== -1) {
    factExit.likes.splice(alreadyLiked, 1);
  } else {
    factExit.likes.push(req.user._id);
  }

  const updatedfact = await factExit.save();

  res.status(200).json(updatedfact);
});

/***
 * @description Fact  dislike
 * @route PATCH /api/fact/:id
 * @access Private
 */
const dislikeToggle = asyncHandler(async (req, res) => {
  const factExit = await Fact.findById(req.params.id);

  if (!factExit) {
    res.status(404);
    throw new Error('No fact found');
  }

  let alreadyLiked = -1;
  for (let i = 0; i < factExit.dislikes.length; i++) {
    if (factExit.dislikes[i].equals(req.user._id)) {
      alreadyLiked = i;
      break;
    }
  }

  if (alreadyLiked !== -1) {
    factExit.dislikes.splice(alreadyLiked, 1);
  } else {
    factExit.dislikes.push(req.user._id);
  }

  const updatedfact = await factExit.save();

  res.status(200).json(updatedfact);
});

/***
 * @description Delete Fact
 * @route PATCH /api/fact/:id
 * @access Private
 */
const deleteFact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const fact = await Fact.findOne({ user: req.user._id, _id: id });

  if (!fact || !fact.user.equals(req.user._id)) {
    res.status(404);
    throw new Error('Error while deleting fact');
  }

  await Fact.findOneAndDelete({ user: req.user._id, _id: id });

  res.status(200).json({});
});

export {
  getAllFacts,
  createFact,
  deleteFact,
  updatedFact,
  likeToggle,
  getFactsByCategory,
  getFactsById,
  dislikeToggle,
};
