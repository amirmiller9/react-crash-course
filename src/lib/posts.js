import db from './db';
import { unstable_cache } from 'next/cache';

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

const getPostsCached = unstable_cache(
  async () => db.prepare('SELECT * FROM posts').all(),
  ['posts'],
  { tags: ['posts'] }
);

export async function getPosts() {
  return getPostsCached();
}

export async function getPost(id) {
  const getPostCached = unstable_cache(
    async () => db.prepare('SELECT * FROM posts WHERE id = ?').get(id),
    ['post', id],
    { tags: [`post-${id}`] }
  );

  return getPostCached();
}

export async function savePost(post) {
  if (!post.id) {
    post.id = Math.random().toString();
  }
  db.prepare(`
    INSERT INTO posts (id, author, body, likes)
    VALUES (@id, @author, @body, 0)
  `).run(post);

  return post;
}

export async function likePost(id) {
  db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(id);
}

export async function deletePost(id) {
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
}
