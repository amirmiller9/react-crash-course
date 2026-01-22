import { Suspense } from 'react';
import PostsList from '../../components/PostsList';
import ImageSlideshow from '../../components/ImageSlideshow';
import classes from './page.module.css';
import { getPosts } from '../../lib/posts';

async function Posts() {
  const posts = await getPosts();

  return <PostsList posts={posts} />;
}

export default function Home() {
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
