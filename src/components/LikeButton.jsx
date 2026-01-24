'use client';

import { useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import classes from './Post.module.css';
import { toggleLikeAction } from '../actions/posts';

function LikeButtonContent({ optimisticLikes }) {
  const { pending } = useFormStatus();

  return (
    <button className={classes.likeButton} disabled={pending}>
      ❤️ {optimisticLikes || 0}
    </button>
  );
}

export default function LikeButton({ id, likes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, _) => state + 1
  );

  async function handleLike() {
    addOptimisticLike(null);
    await toggleLikeAction(id);
  }

  return (
    <form action={handleLike}>
      <LikeButtonContent optimisticLikes={optimisticLikes} />
    </form>
  );
}
