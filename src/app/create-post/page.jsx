import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PostsList from '../../components/PostsList';
import Modal from '../../components/Modal';
import classes from '../../components/NewPost.module.css';
import Link from 'next/link';

async function addPostAction(formData) {
  'use server';

  const postData = {
    body: formData.get('body'),
    author: formData.get('author'),
  };

  const response = await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to save post.');
  }

  revalidatePath('/');
  redirect('/');
}

export default async function CreatePostPage() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  const posts = resData.posts;

  return (
    <>
      <main>
        <PostsList posts={posts} />
      </main>
      <Modal>
        <form action={addPostAction} className={classes.form}>
          <p>
            <label htmlFor="body">Text</label>
            <textarea id="body" name="body" required rows={3} />
          </p>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="author" required />
          </p>
          <p className={classes.actions}>
            <Link href="/" className={classes.button}>
              Cancel
            </Link>
            <button type="submit">Submit</button>
          </p>
        </form>
      </Modal>
    </>
  );
}
