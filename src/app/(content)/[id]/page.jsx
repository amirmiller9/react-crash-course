import { Suspense, use } from 'react';
import PostsList from '../../../components/PostsList';
import Modal from '../../../components/Modal';
import classes from '../../../components/PostDetails.module.css';
import Link from 'next/link';

async function Posts() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch posts.');
  }

  return <PostsList posts={resData.posts} />;
}

async function PostDetails({ id }) {
  const postResponse = await fetch(`http://localhost:8080/posts/${id}`);

  if (!postResponse.ok) {
    throw new Error('Failed to fetch post details.');
  }

  const postData = await postResponse.json();
  const post = postData.post;

  if (!post) {
    return (
      <main className={classes.details}>
        <h1>Could not find post</h1>
        <p>Unfortunately, the requested post could not be found.</p>
        <p>
          <Link href="/" className={classes.button}>
            Okay
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className={classes.details}>
      <p className={classes.author}>{post.author}</p>
      <p className={classes.text}>{post.body}</p>
    </main>
  );
}

export default async function PostDetailsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <main>
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'white' }}>Loading posts...</p>}>
          <Posts />
        </Suspense>
      </main>
      <Modal>
        <Suspense fallback={<p className={classes.loading}>Loading post details...</p>}>
          <PostDetails id={id} />
        </Suspense>
      </Modal>
    </>
  );
}
