import Link from 'next/link';
import MealsHeader from '../../components/MealsHeader';
import MealsGrid from '../../components/MealsGrid';
import { getMeals } from '../../lib/meals';
import classes from './page.module.css';

export default async function MealsPage() {
  const meals = await getMeals();

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
        <MealsGrid meals={meals} />
      </section>
    </main>
  );
}
