import Link from 'next/link';
import Image from 'next/image';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <div className={classes.actions}>
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
