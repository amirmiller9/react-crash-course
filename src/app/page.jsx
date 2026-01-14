import PostsList from '../components/PostsList';
import ImageSlideshow from '../components/ImageSlideshow';
import classes from './page.module.css';

export default async function Home() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  const posts = resData.posts;

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
        <PostsList posts={posts} />
      </section>
    </main>
  );
}
