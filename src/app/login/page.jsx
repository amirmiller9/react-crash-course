'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { loginAction } from '../../actions/auth';
import classes from './page.module.css';

function LoginFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

const initialState = { errors: {} };

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <>
      <header className={classes.header}>
        <h1>Login to Your Account</h1>
      </header>
      <main className={classes.main}>
        <form action={formAction} className={classes.form}>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            {state.errors?.email && (
              <span className={classes.fieldError}>{state.errors.email}</span>
            )}
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            {state.errors?.password && (
              <span className={classes.fieldError}>{state.errors.password}</span>
            )}
          </p>
          <div className={classes.actions}>
            <LoginFormSubmit />
          </div>
        </form>
      </main>
    </>
  );
}
