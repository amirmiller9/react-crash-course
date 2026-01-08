import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  return (
    <ul className={classes.posts}>
      <Post author="Amir" body="React is awesome!" />
      <Post author="Junie" body="I'm helping build this app." />
      <Post author="Vite" body="I'm the build tool." />
    </ul>
  );
}

export default PostsList;
