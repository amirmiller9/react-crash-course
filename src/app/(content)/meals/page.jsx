import { Suspense } from 'react';
import Link from 'next/link';

import MealsHeader from '../../../components/MealsHeader';
import MealsGrid from '../../../components/MealsGrid';
import classes from './page.module.css';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const response = await fetch('http://localhost:3000/api/meals');
  
  if (!response.ok) {
    throw new Error('Failed to fetch meals.');
  }

  const meals = await response.json();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <main className={classes.main}>
      <MealsHeader title="Delicious meals, created by you">
        <p className={classes.description}>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share" className={classes.button}>
            Share Your Favorite Recipe
          </Link>
        </p>
      </MealsHeader>
      <section className={classes.content}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </section>
    </main>
  );
}
