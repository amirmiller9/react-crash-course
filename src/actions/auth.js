'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createUser, getUserByEmail } from '../lib/user';
import { lucia } from '../lib/auth';
import bcrypt from 'bcryptjs';

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

  const existingUser = getUserByEmail(email);

  if (existingUser) {
    return {
      errors: {
        email: 'An account with this email already exists.',
      },
    };
  }

  let userId;
  try {
    userId = await createUser(email, password, firstName, lastName);
  } catch (error) {
    throw error;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

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

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Invalid email or password.',
      },
    };
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    return {
      errors: {
        email: 'Invalid email or password.',
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return {
      error: 'Unauthorized',
    };
  }

  const { session } = await lucia.validateSession(sessionCookie.value);
  if (!session) {
    const blankSessionCookie = lucia.createBlankSessionCookie();
    cookieStore.set(
      blankSessionCookie.name,
      blankSessionCookie.value,
      blankSessionCookie.attributes
    );
    return;
  }

  await lucia.invalidateSession(session.id);

  const blankSessionCookie = lucia.createBlankSessionCookie();
  cookieStore.set(
    blankSessionCookie.name,
    blankSessionCookie.value,
    blankSessionCookie.attributes
  );

  redirect('/');
}
