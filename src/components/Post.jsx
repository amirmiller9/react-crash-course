import Link from 'next/link';
import classes from './Post.module.css';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
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
          <DeleteButton />
        </form>
        <LikeButton id={id} likes={likes} />
      </div>
    </li>
  );
}

export default Post;
