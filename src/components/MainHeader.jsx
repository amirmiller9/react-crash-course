import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';
import amirImage from '../assets/amir.png';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <div className={classes.actions}>
        <img src={amirImage} alt="Amir Miller" className={classes.avatar} />
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
