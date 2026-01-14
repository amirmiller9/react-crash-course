import PostsList from '../components/PostsList';

export default async function Home() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  const posts = resData.posts;

  return (
    <main>
      <PostsList posts={posts} />
    </main>
  );
}
