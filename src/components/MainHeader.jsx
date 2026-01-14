import Link from 'next/link';
import Image from 'next/image';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <Link href="/" className={classes.logoLink}>
          <Image 
            src="/images/logo.jpg" 
            alt="React Poster Logo" 
            width={40} 
            height={40} 
            className={classes.logoImage}
            priority
          />
          React Poster
        </Link>
      </h1>
      <div className={classes.actions}>
        <Link href="/meals" className={classes.link}>
          Browse Meals
        </Link>
        <Link href="/community" className={classes.link}>
          Foodies Community
        </Link>
        <Link href="/about" className={classes.link}>
          About
        </Link>
        <Image 
          src="/images/amir.png" 
          alt="Amir Miller" 
          width={56} 
          height={56} 
          className={classes.avatar}
          priority
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
