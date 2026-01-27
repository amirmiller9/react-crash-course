import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import PostsList from '../../../components/PostsList';
import Modal from '../../../components/Modal';
import NewPostForm from '../../../components/NewPostForm';
import classes from '../../../components/NewPost.module.css';
import { getPosts } from '../../../lib/posts';
import { verifyAuth } from '../../../lib/auth';

async function Posts() {
  const posts = await getPosts();
  return <PostsList posts={posts} />;
}

export default async function CreatePostPage() {
  const { user } = await verifyAuth();

  if (!user) {
    redirect('/auth?mode=login');
  }

  return (
    <>
      <main>
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'white' }}>Loading posts...</p>}>
          <Posts />
        </Suspense>
      </main>
      <Modal>
        <Suspense fallback={<p className={classes.loading}>Preparing form...</p>}>
          <NewPostForm />
        </Suspense>
      </Modal>
    </>
  );
}
