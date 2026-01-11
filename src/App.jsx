import { useState } from 'react';

import PostsList from './components/PostsList'
import MainHeader from './components/MainHeader'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Show the modal when the "New Post" button in the header is clicked
  function showModalHandler() {
    setModalIsVisible(true);
  }

  // Hide the modal when the background is clicked or the "Cancel" button is used
  function hideModalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostsList
          isModalVisible={modalIsVisible}
          onStopPosting={hideModalHandler}
        />
      </main>
    </>
  )
}

export default App
