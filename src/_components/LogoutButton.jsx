'use client';

import { useFormStatus } from 'react-dom';
import classes from './MainHeader.module.css';

export default function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button className={classes.logoutButton} disabled={pending}>
      {pending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
