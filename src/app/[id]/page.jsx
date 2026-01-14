import PostsList from '../../components/PostsList';
import Modal from '../../components/Modal';
import classes from '../../components/PostDetails.module.css';
import Link from 'next/link';

export default async function PostDetailsPage({ params }) {
  const { id } = await params;
  
  // Fetch both all posts (to render the background) and the specific post
  const postsResponse = await fetch('http://localhost:8080/posts', {
    next: { revalidate: 0 }
  });
  const postsData = await postsResponse.json();
  const posts = postsData.posts;

  const postResponse = await fetch(`http://localhost:8080/posts/${id}`, {
    next: { revalidate: 0 }
  });
  const postData = await postResponse.json();
  const post = postData.post;

  if (!post) {
    return (
      <>
        <main>
          <PostsList posts={posts} />
        </main>
        <Modal>
          <main className={classes.details}>
            <h1>Could not find post</h1>
            <p>Unfortunately, the requested post could not be found.</p>
            <p>
              <Link href="/" className={classes.button}>
                Okay
              </Link>
            </p>
          </main>
        </Modal>
      </>
    );
  }

  return (
    <>
      <main>
        <PostsList posts={posts} />
      </main>
      <Modal>
        <main className={classes.details}>
          <p className={classes.author}>{post.author}</p>
          <p className={classes.text}>{post.body}</p>
        </main>
      </Modal>
    </>
  );
}
