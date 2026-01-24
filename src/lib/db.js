import sql from 'better-sqlite3';

const db = sql('meals.db');

try {
  db.pragma('journal_mode = DELETE');
} catch (error) {
  // If the database is locked (e.g., during module evaluation in some environments),
  // we ignore it here as the journal mode might already be set or will be set later.
  console.warn('Could not set journal_mode to DELETE, database might be locked.');
}

export default db;
