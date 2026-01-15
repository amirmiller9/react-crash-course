import { Suspense } from 'react';
import PostsList from '../../components/PostsList';
import Modal from '../../components/Modal';
import classes from '../../components/NewPost.module.css';
import Link from 'next/link';
import { addPostAction } from '../../lib/actions';

async function Posts() {
  const response = await fetch('http://localhost:8080/posts');

  if (!response.ok) {
    throw new Error('Failed to fetch posts.');
  }

  const resData = await response.json();
  const posts = resData.posts;

  return <PostsList posts={posts} />;
}

export default async function CreatePostPage() {
  return (
    <>
      <main>
        <Suspense fallback={<p className={classes.loading}>Loading posts...</p>}>
          <Posts />
        </Suspense>
      </main>
      <Modal>
        <Suspense fallback={<p className={classes.loading}>Preparing form...</p>}>
          <form action={addPostAction} className={classes.form}>
          <p>
            <label htmlFor="body">Text</label>
            <textarea id="body" name="body" required rows={3} />
          </p>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="author" required />
          </p>
          <p className={classes.actions}>
            <Link href="/" className={classes.button}>
              Cancel
            </Link>
            <button type="submit">Submit</button>
          </p>
        </form>
        </Suspense>
      </Modal>
    </>
  );
}
