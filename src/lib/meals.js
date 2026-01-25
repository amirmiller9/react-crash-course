import { cache } from 'react';
import db from './db';
import { unstable_cache } from 'next/cache';
import slugify from 'slugify';
import xss from 'xss';
import { uploadImage } from './cloudinary';

export const getMeals = cache(async function getMeals() {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM meals').all(),
    ['meals'],
    { tags: ['meals'], revalidate: 3600 }
  )();
});

export const getMeal = cache(async function getMeal(slug) {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug),
    ['meal', slug],
    { tags: [`meal-${slug}`] }
  )();
});

export async function deleteMeal(slug) {
  const meal = db.prepare('SELECT image FROM meals WHERE slug = ?').get(slug);

  if (!meal) {
    return null;
  }

  db.prepare('DELETE FROM meals WHERE slug = ?').run(slug);

  return meal;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });

  // Ensure slug uniqueness
  const existingMeal = db.prepare('SELECT slug FROM meals WHERE slug = ?').get(meal.slug);
  if (existingMeal) {
    meal.slug = `${meal.slug}-${Math.random().toString(36).substring(2, 7)}`;
  }

  meal.instructions = xss(meal.instructions);

  const bufferedImage = await meal.image.arrayBuffer();
  const uploadResult = await uploadImage({
    buffer: Buffer.from(bufferedImage),
    folder: process.env.CLOUDINARY_FOLDER || 'meals',
    publicId: meal.slug,
  });

  meal.image = uploadResult.secure_url;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);

  return meal;
}
