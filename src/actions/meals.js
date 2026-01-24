'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { deleteMeal, saveMeal } from '../lib/meals';
import { deleteImage } from '../lib/cloudinary';

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
    const savedMeal = await saveMeal(meal);
    revalidateTag('meals');
    revalidateTag(`meal-${savedMeal.slug}`);
    revalidatePath('/meals', 'layout');
    redirect('/meals');
  } catch (error) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return {
      message: 'Failed to save meal. Please try again later.',
      errors: {},
    };
  }
}

export async function deleteMealAction(slug) {
  try {
    const deletedMeal = await deleteMeal(slug);

    if (!deletedMeal) {
      return;
    }

    if (deletedMeal.image?.includes('res.cloudinary.com')) {
      const folder = process.env.CLOUDINARY_FOLDER || 'meals';
      const publicId = `${folder}/${slug}`;
      try {
        await deleteImage(publicId);
      } catch (error) {
        // ignore image deletion failures so DB stays consistent
      }
    }

    revalidateTag('meals');
    revalidateTag(`meal-${slug}`);
    revalidatePath('/meals', 'layout');
  } catch (error) {
    console.error('Failed to delete meal:', error);
  }
}
