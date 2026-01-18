const { pool } = require('../config/database');

async function createUser(email, hashedPassword) {
  const [result] = await pool.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    'SELECT id, email, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
