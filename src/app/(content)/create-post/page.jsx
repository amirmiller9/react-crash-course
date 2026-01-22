'use client';

import { Suspense, useActionState, use } from 'react';
import PostsList from '../../../components/PostsList';
import Modal from '../../../components/Modal';
import PostFormSubmit from '../../../components/PostFormSubmit';
import classes from '../../../components/NewPost.module.css';
import Link from 'next/link';
import { addPostAction } from '../../../lib/actions';

function PostsWithUse({ promise }) {
  const posts = use(promise);
  return <PostsList posts={posts} />;
}

export default function CreatePostPage() {
  const [state, formAction] = useActionState(addPostAction, { message: null });
  const postsPromise = fetch('http://localhost:8080/posts').then(res => res.json()).then(data => data.posts);

  return (
    <>
      <main>
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'white' }}>Loading posts...</p>}>
          <PostsWithUse promise={postsPromise} />
        </Suspense>
      </main>
      <Modal>
        <Suspense fallback={<p className={classes.loading}>Preparing form...</p>}>
          <form action={formAction} className={classes.form}>
          <p>
            <label htmlFor="body">Text</label>
            <textarea id="body" name="body" required rows={3} />
          </p>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="author" required />
          </p>
          {state.message && <p className={classes.error} style={{color: '#ff8a05', fontWeight: 'bold', margin: '1rem 0'}}>{state.message}</p>}
          <p className={classes.actions}>
            <Link href="/" className={classes.button}>
              Cancel
            </Link>
            <PostFormSubmit />
          </p>
        </form>
        </Suspense>
      </Modal>
    </>
  );
}
