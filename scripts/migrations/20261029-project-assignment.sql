-- Apply once to pv247-fall-2026 before deploying the project-entry feature.
-- NULL identifies a custom project; the other values identify offered assignments.
ALTER TABLE project ADD COLUMN assignment TEXT
  CONSTRAINT project_assignment_check
  CHECK (assignment IS NULL OR assignment IN ('meal-planner', 'therapist-booking'));
