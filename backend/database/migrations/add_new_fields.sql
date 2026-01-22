USE railway;

ALTER TABLE applications 
ADD COLUMN job_id VARCHAR(100) DEFAULT NULL AFTER id,
ADD COLUMN salary INT DEFAULT NULL AFTER applied_date,
ADD COLUMN status_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER status;

CREATE INDEX idx_salary ON applications(salary);
CREATE INDEX idx_role ON applications(role);
