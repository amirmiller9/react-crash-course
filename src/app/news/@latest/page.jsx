import { getLatestNews } from '../../../lib/news';
import classes from '../page.module.css';

export default async function LatestNewsPage() {
  const latestNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <ul className={classes.news}>
        {latestNews.map((newsItem) => (
          <li key={newsItem.id}>
            <img src={`/images/slideshow/${newsItem.image}`} alt={newsItem.title} />
            <span>{newsItem.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
