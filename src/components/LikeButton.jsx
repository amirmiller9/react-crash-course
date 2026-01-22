'use client';

import { useOptimistic } from 'react';
import classes from './Post.module.css';
import { toggleLikeAction } from '../lib/actions';

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
      <button className={classes.likeButton}>
        ❤️ {optimisticLikes || 0}
      </button>
    </form>
  );
}
