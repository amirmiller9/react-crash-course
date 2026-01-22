import Link from 'next/link';
import classes from '../page.module.css';
import { getLatestNews } from '../../../../lib/news';

export default async function LatestNewsPage() {
  const latestNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
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
    </>
  );
}
