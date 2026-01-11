import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';

function PostsList({ isModalVisible, onStopPosting }) {
  const [posts, setPosts] = useState([
    { author: "Amir", body: "React is awesome!" },
    { author: "Junie", body: "I'm helping build this app." },
    { author: "Vite", body: "I'm the build tool." },
  ]);

  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isModalVisible && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div className={classes.noposts}>
          <h2>There are no posts yet.</h2>
          <p>Be the first to share something!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
