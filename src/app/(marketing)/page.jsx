import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PostsList from '../../components/PostsList';
import ImageSlideshow from '../../components/ImageSlideshow';
import classes from './page.module.css';
import { getPosts } from '../../lib/posts';
import { verifyAuth } from '../../lib/auth';

async function Posts() {
  const posts = await getPosts();

  return <PostsList posts={posts} />;
}

export default async function Home() {
  const { user } = await verifyAuth();

  if (!user) {
    return (
      <main className={classes.main}>
        <header className={classes.header}>
          <div className={classes.slideshow}>
            <ImageSlideshow />
          </div>
          <div className={classes.hero}>
            <h1>Welcome to React Poster</h1>
            <p className={classes.subtitle}>
              Share your thoughts, connect with others, and discover amazing content.
            </p>
            <p className={classes.cta}>
              <Link href="/auth?mode=login" className={classes.loginButton}>Login to Get Started</Link>
            </p>
          </div>
        </header>
      </main>
    );
  }

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div className={classes.hero}>
          <h1>Welcome to React Poster</h1>
          <p className={classes.subtitle}>
            Share your thoughts, connect with others, and discover amazing content.
          </p>
        </div>
      </header>
      <section className={classes.content}>
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'white' }}>Loading posts...</p>}>
          <Posts />
        </Suspense>
      </section>
    </main>
  );
}
