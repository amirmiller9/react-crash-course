import Link from 'next/link';
import classes from './Post.module.css';
import LikeButton from './LikeButton';
import { deletePostAction } from '../lib/actions';

function Post({ id, author, body, likes }) {
  const deletePost = deletePostAction.bind(null, id);

  return (
    <li className={classes.post}>
      <Link href={`/${id}`}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
      <div className={classes.actions}>
        <form action={deletePost}>
          <button type="submit" className={classes.deleteButton}>
            Delete
          </button>
        </form>
        <LikeButton id={id} likes={likes} />
      </div>
    </li>
  );
}

export default Post;
