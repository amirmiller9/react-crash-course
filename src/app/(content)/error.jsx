'use client';

import classes from './error.module.css';

export default function Error({ error, reset }) {
  return (
    <main className="error-content">
      <h1>An error occurred!</h1>
      <p>{error.message || 'Failed to fetch data. Please try again later.'}</p>
      <button className={classes.button} onClick={reset}>
        Try Again
      </button>
    </main>
  );
}
