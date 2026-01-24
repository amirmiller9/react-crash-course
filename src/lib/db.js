import sql from 'better-sqlite3';

const db = sql('meals.db');
db.pragma('journal_mode = DELETE');

export default db;
