import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { getNewsItem } from '../../../lib/news';

export default async function NewsDetailPage({ params }) {
  const { id: newsId } = await params;
  const newsItem = await getNewsItem(newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header className="news-header">
        <div className="news-image">
          <Link href={`/news/${newsItem.slug}/image`}>
            <Image
              src={`/images/slideshow/${newsItem.image}`}
              alt={newsItem.title}
              width={800}
              height={400}
              priority
            />
          </Link>
        </div>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p className="news-content">{newsItem.content}</p>
    </article>
  );
}
