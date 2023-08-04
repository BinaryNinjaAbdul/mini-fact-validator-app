import asyncHandler from 'express-async-handler';
import validator from 'validator';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/***
 * @description Auth user / set token
 * @route POST /api/user/auth
 * @access PUBLIC
 */

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    admin: user.isAdmin,
  });
});

/***
 * @description Register user / set token
 * @route POST /api/user
 * @access PUBLIC
 */

const resgisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('A user must have a name');
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error('Please enter a valid email address');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Already a registered user');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  generateToken(res, user._id);

  res.status(200).json({
    message: 'User Created Successfully',
    _id: user._id,
    name: user.name,
    email: user.email,
    admin: user.isAdmin,
  });
});

/***
 * @description Logout user / remove token
 * @route POST /api/user/logout
 * @access PUBLIC
 */

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

/***
 * @description Get user proifle
 * @route GET /api/user/profile
 * @access PRIVATE
 */

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    admin: req.user.isAdmin,
  };

  res.status(200).json(user);
});

/***
 * @description Update user proifle
 * @route PATCH /api/user/profile
 * @access PRIVATE
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export {
  authUser,
  resgisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
