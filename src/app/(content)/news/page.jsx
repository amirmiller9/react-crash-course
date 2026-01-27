import { redirect } from 'next/navigation';
import { getAllNews } from '../../../lib/news';
import Link from 'next/link';
import classes from './page.module.css';
import { verifyAuth } from '../../../lib/auth';

export const revalidate = 3600; // Cache this page for 1 hour

export default async function NewsPage() {
  const { user } = await verifyAuth();

  if (!user) {
    redirect('/login');
  }

  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <ul className={classes.news}>
        {news.map((newsItem) => (
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
