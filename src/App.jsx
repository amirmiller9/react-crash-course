import { useState } from 'react';

import PostsList from './components/PostsList'
import MainHeader from './components/MainHeader'
import Modal from './components/Modal'
import NewPost from './components/NewPost'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [posts, setPosts] = useState([
    { author: "Amir", body: "React is awesome!" },
    { author: "Junie", body: "I'm helping build this app." },
    { author: "Vite", body: "I'm the build tool." },
  ]);

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        {modalIsVisible && (
          <Modal onClose={hideModalHandler}>
            <NewPost onCancel={hideModalHandler} onAddPost={addPostHandler} />
          </Modal>
        )}
        <PostsList posts={posts} />
      </main>
    </>
  )
}

export default App
