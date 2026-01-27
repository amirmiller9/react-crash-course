'use server';

import { redirect } from 'next/navigation';

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

  // TODO: Implement actual user creation logic (e.g., hash password, save to DB)
  console.log('User signed up:', { email, firstName, lastName });

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
