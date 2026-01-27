import { redirect } from 'next/navigation';
import Link from 'next/link';
import MealsHeader from '../../../components/MealsHeader';
import classes from './About.module.css';
import { verifyAuth } from '../../../lib/auth';

export default async function AboutPage() {
  const { user } = await verifyAuth();

  return (
    <main className={classes.aboutMain}>
      <MealsHeader title="About React Poster">
        <p>
          React Poster is a simple social media application built to demonstrate
          the power of React and Next.js.
        </p>
        {!user && (
          <p className={classes.loginNote}>
            <Link href="/auth?mode=login">Login</Link> to see the full feed and share your own posts!
          </p>
        )}
        <p>
          Originally started as a Vite-based SPA, it has been fully migrated to
          the Next.js App Router, showcasing features like:
        </p>
        <ul>
          <li>File-system Based Routing</li>
          <li>Server Components</li>
          <li>Server Actions</li>
          <li>Optimized Navigation with next/link</li>
        </ul>
        <p>
          <Link href="/" className={classes.button}>
            Back to Feed
          </Link>
        </p>
      </MealsHeader>
    </main>
  );
}
