# Project assignment migration

Before deploying the project-entry feature, apply `20261029-project-assignment.sql`
once to the project's Turso database, **`pv247-fall-2026`**. Obtain authorization
before applying it to the shared database. The migration only adds a nullable
assignment column and a constraint; it does not delete projects or user data.

The assignment is `NULL` for a custom project, `meal-planner` for Weekly Meal
Planner, or `therapist-booking` for Therapist Booking System.

Check `PRAGMA table_info(project)` before applying the migration: if the
`assignment` column already exists, do not run the `ALTER TABLE` again. For future
schema changes, preserve the column and its `project_assignment_check` constraint.
