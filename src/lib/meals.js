import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { uploadImage } from './cloudinary';

const db = sql('meals.db');
db.pragma('journal_mode = WAL');

db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

export async function getMeals() {
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
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
}
