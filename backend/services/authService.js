const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function signup(email, password) {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);
  const userId = await userModel.createUser(email, hashedPassword);
  const token = generateToken(userId);

  return { userId, email, token };
}

async function login(email, password) {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);
  return { userId: user.id, email: user.email, token };
}

module.exports = {
  signup,
  login,
  verifyToken,
  hashPassword,
  comparePassword,
  generateToken
};
