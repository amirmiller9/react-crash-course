import { notFound } from 'next/navigation';
import Image from 'next/image';

import Modal from '../../../../../components/Modal';
import { getNewsItem } from '../../../../../lib/news';

export default async function InterceptedNewsDetailPage({ params }) {
  const { id: newsSlug } = await params;
  const newsItem = await getNewsItem(newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <Modal>
      <article className="modal-article">
        <header className="modal-header">
          <div className="modal-image">
            <Image
              src={`/images/slideshow/${newsItem.image}`}
              alt={newsItem.title}
              width={400}
              height={300}
            />
          </div>
          <h1>{newsItem.title}</h1>
        </header>
        <p>{newsItem.content}</p>
      </article>
    </Modal>
  );
}
