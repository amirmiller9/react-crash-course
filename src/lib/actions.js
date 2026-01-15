'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function shareMealAction(formData) {
  // To be implemented when we connect the share meal form
  console.log('shareMealAction', formData);
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
