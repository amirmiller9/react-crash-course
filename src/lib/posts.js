import { cache } from 'react';
import db from './db';
import { unstable_cache } from 'next/cache';

export const getPosts = cache(async function getPosts() {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM posts').all(),
    ['posts'],
    { tags: ['posts'] }
  )();
});

export const getPost = cache(async function getPost(id) {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM posts WHERE id = ?').get(id),
    ['post', id],
    { tags: [`post-${id}`] }
  )();
});

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
