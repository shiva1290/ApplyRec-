CREATE DATABASE IF NOT EXISTS applyrec;

USE applyrec;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  status ENUM('Applied', 'OA', 'Interview', 'Rejected', 'Offer') NOT NULL,
  applied_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_status (user_id, status),
  INDEX idx_applied_date (applied_date)
);
