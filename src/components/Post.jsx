import Link from 'next/link';
import classes from './Post.module.css';
import LikeButton from './LikeButton';

function Post({ id, author, body, likes }) {
  return (
    <li className={classes.post}>
      <Link href={`/${id}`}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
      <div className={classes.actions}>
        <LikeButton id={id} likes={likes} />
      </div>
    </li>
  );
}

export default Post;
