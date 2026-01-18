import Link from 'next/link';

import { DUMMY_NEWS } from '../../dummy-news';
import classes from './page.module.css';

export default function NewsPage() {
  return (
    <main>
      <h1>News Page</h1>
      <ul className={classes.news}>
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img
                src={`/images/slideshow/${newsItem.image}`}
                alt={newsItem.title}
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
