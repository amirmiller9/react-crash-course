import Link from 'next/link';
import classes from '../page.module.css';

export default async function LatestNewsPage() {
  const response = await fetch('http://localhost:3000/api/news/latest');
  
  if (!response.ok) {
    throw new Error('Failed to fetch latest news.');
  }

  const latestNews = await response.json();

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
