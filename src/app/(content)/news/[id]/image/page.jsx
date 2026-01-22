import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getNewsItem } from '../../../../../lib/news';

export default async function ImagePage({ params }) {
  const { id: newsId } = await params;
  const newsItem = await getNewsItem(newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <Image
        src={`/images/slideshow/${newsItem.image}`}
        alt={newsItem.title}
        fill
      />
    </div>
  );
}
