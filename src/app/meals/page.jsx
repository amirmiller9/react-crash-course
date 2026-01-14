import Link from 'next/link';
import classes from './page.module.css';

export default function MealsPage() {
  return (
    <main className={classes.main}>
      <h1 className={classes.title}>Meals Page</h1>
      <p className={classes.description}>Delicious meals, created by you.</p>
      <p className={classes.cta}>
        <Link href="/meals/share" className={classes.button}>
          Share Your Favorite Recipe
        </Link>
      </p>
    </main>
  );
}
