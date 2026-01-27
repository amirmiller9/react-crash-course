'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { savePost, likePost, deletePost } from '../lib/posts';
import { verifyAuth } from '../lib/auth';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function addPostAction(prevState, formData) {
  const { user } = await verifyAuth();

  if (!user) {
    return {
      message: 'Unauthorized. Please login to add a post.',
      errors: {},
    };
  }

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
    revalidatePath('/', 'layout');
    revalidatePath('/create-post'); // Ensure the form page is also refreshed if needed
    redirect('/');
  } catch (error) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return {
      message: 'Failed to save post.',
      errors: {},
    };
  }
}

export async function toggleLikeAction(postId) {
  const { user } = await verifyAuth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    await likePost(postId);
    revalidateTag('posts');
    revalidateTag(`post-${postId}`);
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Failed to like post:', error);
  }
}

export async function deletePostAction(postId) {
  const { user } = await verifyAuth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    await deletePost(postId);
    revalidateTag('posts');
    revalidateTag(`post-${postId}`);
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
}
