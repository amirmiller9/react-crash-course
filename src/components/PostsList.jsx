import Post from './Post';
import classes from './PostsList.module.css';

function PostsList({ posts }) {
  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, index) => (
            <Post key={index} author={post.author} body={post.body} />
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
