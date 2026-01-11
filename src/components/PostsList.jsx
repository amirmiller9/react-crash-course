import { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ isModalVisible, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          throw new Error('Could not fetch posts.');
        }
        const resData = await response.json();
        setPosts(resData.posts);
      } catch (error) {
        // Error handling for failed fetch
        console.error(error.message);
      }
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  // Handler for adding a new post via the backend
  async function addPostHandler(postData) {
    try {
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

      // Update local state to show the new post immediately after successful save
      setPosts((existingPosts) => [postData, ...existingPosts]);
    } catch (error) {
      console.error(error.message);
      // Alert the user if something went wrong (e.g., backend offline)
      alert('Failed to save the post. Is the backend server running?');
    }
  }

  return (
    <>
      {isModalVisible && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div className={classes.noposts}>
          <h2>There are no posts yet.</h2>
          <p>Be the first to share something!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
