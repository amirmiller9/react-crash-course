'use client';

import { useFormStatus } from 'react-dom';
import classes from './Post.module.css';

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={classes.deleteButton} disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
