import { Outlet } from 'react-router-dom';
import PostsList from '../components/PostsList';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  if (!response.ok) {
    throw new Error('Could not fetch posts.');
  }
  const resData = await response.json();
  return resData.posts;
}
