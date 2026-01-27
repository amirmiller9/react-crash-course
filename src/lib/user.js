import db from './db';
import bcrypt from 'bcryptjs';

export async function createUser(email, password, firstName, lastName) {
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const stmt = db.prepare(`
    INSERT INTO users (email, password, first_name, last_name)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(email, hashedPassword, firstName, lastName);
  return result.lastInsertRowid;
}

export function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}
