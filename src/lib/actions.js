'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { savePost } from './posts';

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

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  try {
    await saveMeal(meal);
  } catch (error) {
    return {
      message: 'Failed to save meal. Please try again later.',
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

  if (isInvalidText(postData.body) || isInvalidText(postData.author)) {
    return {
      message: 'Invalid input.',
    };
  }

  try {
    await savePost(postData);
  } catch (error) {
    return {
      message: 'Failed to save post.',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
