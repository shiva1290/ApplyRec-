const { pool } = require('../config/database');

async function createApplication(userId, company, role, status, appliedDate, notes, followUp, jobId, salary) {
  const [result] = await pool.execute(
    'INSERT INTO applications (user_id, company, role, status, applied_date, notes, follow_up, job_id, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, company, role, status, appliedDate, notes || null, followUp || false, jobId || null, salary || null]
  );
  return result.insertId;
}

async function getApplicationsByUserId(userId, filters = {}) {
  let query = 'SELECT * FROM applications WHERE user_id = ?';
  const params = [userId];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters.role) {
    query += ' AND role = ?';
    params.push(filters.role);
  }

  if (filters.minSalary) {
    query += ' AND salary >= ?';
    params.push(filters.minSalary);
  }

  if (filters.maxSalary) {
    query += ' AND salary <= ?';
    params.push(filters.maxSalary);
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

async function updateApplication(id, userId, company, role, status, appliedDate, notes, followUp, jobId, salary) {
  const [existing] = await pool.execute(
    'SELECT status FROM applications WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  
  let query = 'UPDATE applications SET company = ?, role = ?, status = ?, applied_date = ?, notes = ?, follow_up = ?, job_id = ?, salary = ?';
  const params = [company, role, status, appliedDate, notes || null, followUp || false, jobId || null, salary || null];
  
  if (existing.length > 0 && existing[0].status !== status) {
    query += ', status_updated_at = CURRENT_TIMESTAMP';
  }
  
  query += ' WHERE id = ? AND user_id = ?';
  params.push(id, userId);
  
  const [result] = await pool.execute(query, params);
  return result.affectedRows > 0;
}

async function updateApplicationStatus(id, userId, status) {
  const [result] = await pool.execute(
    'UPDATE applications SET status = ?, status_updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
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

async function getUniqueRoles(userId) {
  const [rows] = await pool.execute(
    'SELECT DISTINCT role FROM applications WHERE user_id = ? ORDER BY role',
    [userId]
  );
  return rows.map(row => row.role);
}

module.exports = {
  createApplication,
  getApplicationsByUserId,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getUniqueRoles
};
