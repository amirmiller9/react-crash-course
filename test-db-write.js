import sql from 'better-sqlite3';
const db = sql('meals.db');
db.pragma('journal_mode = WAL');

function likePost(id) {
  db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(id);
}

try {
  console.log('Attempting to like post 1...');
  likePost('1');
  const row = db.prepare('SELECT likes FROM posts WHERE id = ?').get('1');
  console.log('Successfully liked post 1! New likes:', row.likes);
} catch (error) {
  console.error('Failed to like post:', error);
  process.exit(1);
}
