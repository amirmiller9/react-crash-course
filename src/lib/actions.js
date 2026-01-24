'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { savePost, likePost, deletePost } from './posts';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMealAction(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  const errors = {};

  if (isInvalidText(meal.title)) {
    errors.title = 'Please enter a title.';
  }
  if (isInvalidText(meal.summary)) {
    errors.summary = 'Please enter a short summary.';
  }
  if (isInvalidText(meal.instructions)) {
    errors.instructions = 'Please provide cooking instructions.';
  }
  if (isInvalidText(meal.creator)) {
    errors.name = 'Please enter your name.';
  }
  if (isInvalidText(meal.creator_email) || !meal.creator_email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!meal.image || meal.image.size === 0) {
    errors.image = 'Please select an image.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: 'Invalid input.',
      errors,
    };
  }

  try {
    await saveMeal(meal);
  } catch (error) {
    return {
      message: 'Failed to save meal. Please try again later.',
      errors: {},
    };
  }

  revalidatePath('/meals', 'layout');
  redirect('/meals');
}

export async function addPostAction(prevState, formData) {
  const postData = {
    body: formData.get('body'),
    author: formData.get('author'),
  };

  const errors = {};

  if (isInvalidText(postData.body)) {
    errors.body = 'Please enter a message.';
  }
  if (isInvalidText(postData.author)) {
    errors.author = 'Please enter your name.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: 'Invalid input.',
      errors,
    };
  }

  try {
    await savePost(postData);
  } catch (error) {
    return {
      message: 'Failed to save post.',
      errors: {},
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function toggleLikeAction(postId) {
  await likePost(postId);
  revalidatePath('/', 'layout');
}

export async function deletePostAction(postId) {
  await deletePost(postId);
  revalidatePath('/', 'layout');
}
