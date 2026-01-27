import { redirect } from 'next/navigation';
import Link from 'next/link';
import MealsHeader from '../../../components/MealsHeader';
import classes from './page.module.css';
import { verifyAuth } from '../../../lib/auth';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Foodies Community',
  description: 'Join our community and share your favorite recipes!',
};

export default async function CommunityPage() {
  const { user } = await verifyAuth();

  return (
    <main className={classes.main}>
      <MealsHeader title="Community Page">
        <p className={classes.text}>Join our vibrant community of food lovers!</p>
        {!user && (
          <p className={classes.loginPrompt}>
            <Link href="/login" className={classes.link}>Login</Link> to interact with other foodies!
          </p>
        )}
      </MealsHeader>
    </main>
  );
}
