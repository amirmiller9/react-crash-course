'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import classes from './Post.module.css';
import LikeButton from './LikeButton';
import { deletePostAction } from '../actions/posts';

function Post({ id, author, body, likes }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className={classes.post}>
      <Link href={`/${id}`}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
      <div className={classes.actions}>
        <button
          className={classes.deleteButton}
          onClick={() => startTransition(() => deletePostAction(id))}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
        <LikeButton id={id} likes={likes} />
      </div>
    </li>
  );
}

export default Post;
