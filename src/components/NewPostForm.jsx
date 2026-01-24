'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import PostFormSubmit from './PostFormSubmit';
import classes from './NewPost.module.css';
import { addPostAction } from '../lib/actions';

const initialState = { message: null, errors: {} };

export default function NewPostForm() {
  const [state, formAction] = useActionState(addPostAction, initialState);

  return (
    <form action={formAction} className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} />
        {state.errors?.body && (
          <span className={classes.fieldError}>{state.errors.body}</span>
        )}
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="author" required />
        {state.errors?.author && (
          <span className={classes.fieldError}>{state.errors.author}</span>
        )}
      </p>
      {state.message && (
        <p className={classes.error}>{state.message}</p>
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
