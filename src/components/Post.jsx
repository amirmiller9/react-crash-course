import Link from 'next/link';
import classes from './Post.module.css';

function Post({ id, author, body }) {
  return (
    <li className={classes.post}>
      <Link href={`/${id}`}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
