import Link from 'next/link';
import { Suspense } from 'react';
import classes from '../page.module.css';
import { getLatestNews } from '../../../../lib/news';

async function LatestNews() {
  const latestNews = await getLatestNews();

  return (
    <ul className={classes.news}>
      {latestNews.map((newsItem) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/slideshow/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function LatestNewsPage() {
  return (
    <>
      <h2>Latest News</h2>
      <Suspense fallback={<p>Loading latest news...</p>}>
        <LatestNews />
      </Suspense>
    </>
  );
}
