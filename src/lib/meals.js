import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

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

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const stream = fs.createWriteStream(`public/images/${fileName}`);

  await new Promise((resolve, reject) => {
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

  meal.image = `/images/${fileName}`;

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
