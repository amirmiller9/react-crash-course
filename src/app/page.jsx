import PostsList from '../components/PostsList';
import MealsHeader from '../components/MealsHeader';
import classes from './page.module.css';

export default async function Home() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  const posts = resData.posts;

  return (
    <main className={classes.main}>
      <MealsHeader title="Welcome to React Poster">
        <p className={classes.subtitle}>
          Share your thoughts, connect with others, and discover amazing content.
        </p>
      </MealsHeader>
      <section className={classes.content}>
        <PostsList posts={posts} />
      </section>
    </main>
  );
}
