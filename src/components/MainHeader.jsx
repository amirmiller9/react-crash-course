import Link from 'next/link';
import Image from 'next/image';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import NavLink from './NavLink';
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
        <NavLink href="/meals">Browse Meals</NavLink>
        <NavLink href="/community">Foodies Community</NavLink>
        <NavLink href="/about">About</NavLink>
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
