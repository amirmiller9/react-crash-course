import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '../../../dummy-news';
import classes from './page.module.css';

export default function NewsDetailPage({ params }) {
  const newsId = params.id;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className={classes.article}>
      <header className={classes.header}>
        <img
          src={`/images/slideshow/${newsItem.image}`}
          alt={newsItem.title}
        />
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p className={classes.content}>{newsItem.content}</p>
    </article>
  );
}
