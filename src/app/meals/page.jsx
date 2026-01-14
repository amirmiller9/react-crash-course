import Link from 'next/link';
import MealsHeader from '../../components/MealsHeader';
import classes from './page.module.css';

export default function MealsPage() {
  return (
    <main className={classes.main}>
      <MealsHeader title="Meals Page">
        <p className={classes.description}>Delicious meals, created by you.</p>
        <p className={classes.cta}>
          <Link href="/meals/share" className={classes.button}>
            Share Your Favorite Recipe
          </Link>
        </p>
      </MealsHeader>
    </main>
  );
}
