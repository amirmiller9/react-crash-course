import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onCancel, onAddPost }) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  // Handle changes in the text textarea
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  // Handle changes in the author name input
  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  // Handle form submission
  function submitHandler(event) {
    event.preventDefault(); // Prevent browser default form submission (page reload)
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    onAddPost(postData); // Call the parent handler to save data
    onCancel(); // Close the modal
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} value={enteredBody} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} value={enteredAuthor} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
