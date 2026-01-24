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
    revalidatePath('/', 'layout');
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
  try {
    await deletePost(postId);
    revalidateTag('posts');
    revalidateTag(`post-${postId}`);
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
}
