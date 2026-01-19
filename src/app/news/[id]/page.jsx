import { notFound } from 'next/navigation';

import { getNewsItem } from '../../../lib/news';
import classes from './page.module.css';

export default async function NewsDetailPage({ params }) {
  const { id: newsId } = await params;
  const newsItem = await getNewsItem(newsId);

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
