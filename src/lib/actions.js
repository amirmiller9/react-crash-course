'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';

export async function shareMealAction(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}

export async function addPostAction(formData) {
  const postData = {
    body: formData.get('body'),
    author: formData.get('author'),
  };

  const response = await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to save post.');
  }

  revalidatePath('/');
  redirect('/');
}
