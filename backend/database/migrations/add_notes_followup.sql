USE applyrec;

ALTER TABLE applications 
ADD COLUMN notes TEXT NULL AFTER applied_date,
ADD COLUMN follow_up BOOLEAN DEFAULT FALSE AFTER notes;
