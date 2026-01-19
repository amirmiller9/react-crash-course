import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await fetch(`http://localhost:3000/api/meals/${slug}`);

  if (!response.ok) {
    notFound();
  }

  const meal = await response.json();

  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function Meal({ slug }) {
  const response = await fetch(`http://localhost:3000/api/meals/${slug}`);

  if (!response.ok) {
    notFound();
  }

  const meal = await response.json();

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

export default async function MealDetailsPage({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<p className={classes.loading}>Loading meal details...</p>}>
      <Meal slug={slug} />
    </Suspense>
  );
}
