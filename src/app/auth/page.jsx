'use client';

import { useActionState, Suspense } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { loginAction, signupAction } from '../../actions/auth';
import classes from './page.module.css';

function AuthFormSubmit({ mode }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (mode === 'login' ? 'Logging in...' : 'Submitting...') : (mode === 'login' ? 'Login' : 'Sign Up')}
    </button>
  );
}

const initialState = { errors: {} };

function AuthForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  const [state, formAction] = useActionState(
    mode === 'login' ? loginAction : signupAction,
    initialState
  );

  return (
    <>
      <header className={classes.header}>
        <h1>{mode === 'login' ? 'Login to Your Account' : 'Create an Account'}</h1>
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
          {mode === 'signup' && (
            <>
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
            </>
          )}
          <div className={classes.actions}>
            <Link href="/" className={classes.returnLink}>Return to Home</Link>
            <AuthFormSubmit mode={mode} />
          </div>
          <Link href={`/auth?mode=${mode === 'login' ? 'signup' : 'login'}`} className={classes.modeLink}>
            {mode === 'login' ? 'Create a new account' : 'Login with existing account'}
          </Link>
        </form>
      </main>
    </>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>}>
      <AuthForm />
    </Suspense>
  );
}
