'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { savePost, likePost, deletePost } from '../lib/posts';

function isInvalidText(text) {
  return !text || text.trim() === '';
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
    const savedPost = await savePost(postData);
    revalidateTag('posts');
    revalidateTag(`post-${savedPost.id}`);
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
  revalidateTag('posts');
  revalidateTag(`post-${postId}`);
  revalidatePath('/', 'layout');
}

export async function deletePostAction(postId) {
  await deletePost(postId);
  revalidateTag('posts');
  revalidateTag(`post-${postId}`);
  revalidatePath('/', 'layout');
}
