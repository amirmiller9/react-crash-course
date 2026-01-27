import Link from 'next/link';
import Image from 'next/image';
import { MdPostAdd } from 'react-icons/md';

import NavLink from './NavLink';
import classes from './MainHeader.module.css';
import { verifyAuth } from '../lib/auth';
import { logoutAction } from '../actions/auth';

async function MainHeader() {
  const { user } = await verifyAuth();

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
        <NavLink href="/community">Community</NavLink>
        <NavLink href="/about">About</NavLink>
        {user && (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/news">News</NavLink>
            <NavLink href="/meals">Browse Meals</NavLink>
            <span className={classes.userName}>Hi, {user.firstName}</span>
            <form action={logoutAction}>
              <button className={classes.logoutButton}>Logout</button>
            </form>
            <Link href="/create-post" className={classes.button}>
              <MdPostAdd size={18} />
              New Post
            </Link>
          </>
        )}
        {!user && <NavLink href="/login">Login</NavLink>}
        {!user && <NavLink href="/signup">Sign Up</NavLink>}
        <Image 
          src="/images/amir.png" 
          alt="Amir Miller" 
          width={56} 
          height={56} 
          className={classes.avatar}
          priority
        />
      </div>
    </header>
  );
}

export default MainHeader;
