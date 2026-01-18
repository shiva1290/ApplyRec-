const { pool } = require('../config/database');

async function createApplication(userId, company, role, status, appliedDate, notes = null, followUp = false) {
  const [result] = await pool.execute(
    'INSERT INTO applications (user_id, company, role, status, applied_date, notes, follow_up) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [userId, company, role, status, appliedDate, notes, followUp]
  );
  return result.insertId;
}

async function getApplicationsByUserId(userId, statusFilter = null) {
  let query = 'SELECT * FROM applications WHERE user_id = ?';
  const params = [userId];

  if (statusFilter) {
    query += ' AND status = ?';
    params.push(statusFilter);
  }

  query += ' ORDER BY applied_date DESC';

  const [rows] = await pool.execute(query, params);
  return rows;
}

async function getApplicationById(id, userId) {
  const [rows] = await pool.execute(
    'SELECT * FROM applications WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return rows[0] || null;
}

async function updateApplication(id, userId, company, role, status, appliedDate, notes = null, followUp = false) {
  const [result] = await pool.execute(
    'UPDATE applications SET company = ?, role = ?, status = ?, applied_date = ?, notes = ?, follow_up = ? WHERE id = ? AND user_id = ?',
    [company, role, status, appliedDate, notes, followUp, id, userId]
  );
  return result.affectedRows > 0;
}

async function updateApplicationStatus(id, userId, status) {
  const [result] = await pool.execute(
    'UPDATE applications SET status = ? WHERE id = ? AND user_id = ?',
    [status, id, userId]
  );
  return result.affectedRows > 0;
}

async function deleteApplication(id, userId) {
  const [result] = await pool.execute(
    'DELETE FROM applications WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  createApplication,
  getApplicationsByUserId,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  deleteApplication
};
