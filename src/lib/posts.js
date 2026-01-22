import sql from 'better-sqlite3';

const db = sql('meals.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    body TEXT NOT NULL,
    likes INTEGER DEFAULT 0
  )
`).run();

const count = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;

if (count === 0) {
  const initialPosts = [
    { id: '1', author: 'billing', body: 'admin' },
    { id: '2', author: 'billing', body: 'admin' },
    { id: '3', author: 'miller', body: '22' },
    { id: '4', author: 'Test User', body: 'This is a test post' },
    { id: '5', author: 'Amir', body: 'Welcome to my React crash course!' },
    { id: '6', author: 'Junie', body: 'I\'ve helped setting up the backend for this app!' }
  ];

  const insert = db.prepare('INSERT INTO posts (id, author, body, likes) VALUES (@id, @author, @body, 0)');
  for (const post of initialPosts) {
    insert.run(post);
  }
}

export async function getPosts() {
  return db.prepare('SELECT * FROM posts').all();
}

export async function getPost(id) {
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
}

export async function savePost(post) {
  if (!post.id) {
    post.id = Math.random().toString();
  }
  db.prepare(`
    INSERT INTO posts (id, author, body, likes)
    VALUES (@id, @author, @body, 0)
  `).run(post);
}

export async function likePost(id) {
  db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(id);
}
