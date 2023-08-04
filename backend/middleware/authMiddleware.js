import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error(`Not Authorized, Invalid Token`);
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin === true) return next();

  res.status(401);
  throw new Error('You are not authorized to perform this task');
});

export { protect, isAdmin };
