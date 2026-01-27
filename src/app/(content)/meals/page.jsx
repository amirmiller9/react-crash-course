import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import MealsHeader from '../../../components/MealsHeader';
import MealsGrid from '../../../components/MealsGrid';
import classes from './page.module.css';
import { getMeals } from '../../../lib/meals';
import { verifyAuth } from '../../../lib/auth';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  const { user } = await verifyAuth();

  if (!user) {
    redirect('/auth?mode=login');
  }

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
