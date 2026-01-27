'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { signupAction } from '../../actions/auth';
import classes from './page.module.css';

function SignupFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign Up'}
    </button>
  );
}

const initialState = { errors: {} };

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <>
      <header className={classes.header}>
        <h1>Create an Account</h1>
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
          <p>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
            {state.errors?.confirmPassword && (
              <span className={classes.fieldError}>
                {state.errors.confirmPassword}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
            {state.errors?.firstName && (
              <span className={classes.fieldError}>{state.errors.firstName}</span>
            )}
          </p>
          <p>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
            {state.errors?.lastName && (
              <span className={classes.fieldError}>{state.errors.lastName}</span>
            )}
          </p>
          <div className={classes.actions}>
            <SignupFormSubmit />
          </div>
        </form>
      </main>
    </>
  );
}
