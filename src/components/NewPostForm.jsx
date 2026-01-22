'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import PostFormSubmit from './PostFormSubmit';
import classes from './NewPost.module.css';
import { addPostAction } from '../lib/actions';

export default function NewPostForm() {
  const [state, formAction] = useActionState(addPostAction, { message: null });

  return (
    <form action={formAction} className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="author" required />
      </p>
      {state.message && (
        <p
          className={classes.error}
          style={{
            color: '#ff8a05',
            fontWeight: 'bold',
            margin: '1rem 0',
          }}
        >
          {state.message}
        </p>
      )}
      <p className={classes.actions}>
        <Link href="/" className={classes.button}>
          Cancel
        </Link>
        <PostFormSubmit />
      </p>
    </form>
  );
}
