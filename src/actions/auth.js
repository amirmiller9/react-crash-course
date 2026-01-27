'use server';

import { redirect } from 'next/navigation';
import { createUser } from '../lib/user';

function isValidEmail(email) {
  return email && email.includes('@');
}

function isValidText(text) {
  return text && text.trim().length > 0;
}

export async function signupAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');

  let errors = {};

  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!isValidText(firstName)) {
    errors.firstName = 'First name is required.';
  }

  if (!isValidText(lastName)) {
    errors.lastName = 'Last name is required.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    await createUser(email, password, firstName, lastName);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'An account with this email already exists.',
        },
      };
    }
    throw error;
  }

  redirect('/');
}

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};

  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // TODO: Implement actual login logic (e.g., verify credentials, create session)
  console.log('User logged in:', { email });

  redirect('/');
}
