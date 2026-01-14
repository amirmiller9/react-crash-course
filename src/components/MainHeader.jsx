import Link from 'next/link';
import Image from 'next/image';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <Link href="/" className={classes.logoLink}>
          <MdMessage />
          React Poster
        </Link>
      </h1>
      <div className={classes.actions}>
        <Link href="/about" className={classes.link}>
          About
        </Link>
        <Image 
          src="/images/amir.png" 
          alt="Amir Miller" 
          width={56} 
          height={56} 
          className={classes.avatar}
        />
        <Link href="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
