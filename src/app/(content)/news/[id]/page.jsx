import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsDetailPage({ params }) {
  const { id: newsId } = await params;
  const response = await fetch(`http://localhost:3000/api/news/${newsId}`);

  if (!response.ok) {
    notFound();
  }

  const newsItem = await response.json();

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
