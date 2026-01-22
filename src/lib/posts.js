import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function initPostsDb() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      author TEXT NOT NULL,
      body TEXT NOT NULL
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

    const insert = db.prepare('INSERT INTO posts (id, author, body) VALUES (@id, @author, @body)');
    for (const post of initialPosts) {
      insert.run(post);
    }
  }
}

export async function getPosts() {
  await initPostsDb();
  return db.prepare('SELECT * FROM posts').all();
}

export async function getPost(id) {
  await initPostsDb();
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
}

export async function savePost(post) {
  await initPostsDb();
  if (!post.id) {
    post.id = Math.random().toString();
  }
  db.prepare(`
    INSERT INTO posts (id, author, body)
    VALUES (@id, @author, @body)
  `).run(post);
}
