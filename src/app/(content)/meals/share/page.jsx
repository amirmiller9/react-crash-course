'use client';

import { useActionState } from 'react';

import ImagePicker from '../../../../components/ImagePicker';
import MealsFormSubmit from '../../../../components/MealsFormSubmit';
import classes from './page.module.css';
import { shareMealAction } from '../../../../lib/actions';

const initialState = { message: null, errors: {} };

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMealAction, initialState);

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
              {state.errors?.name && (
                <span className={classes.fieldError}>{state.errors.name}</span>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
              {state.errors?.email && (
                <span className={classes.fieldError}>{state.errors.email}</span>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
            {state.errors?.title && (
              <span className={classes.fieldError}>{state.errors.title}</span>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
            {state.errors?.summary && (
              <span className={classes.fieldError}>{state.errors.summary}</span>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
            {state.errors?.instructions && (
              <span className={classes.fieldError}>
                {state.errors.instructions}
              </span>
            )}
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.errors?.image && (
            <span className={classes.fieldError}>{state.errors.image}</span>
          )}
          {state.message && <p className={classes.error}>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
