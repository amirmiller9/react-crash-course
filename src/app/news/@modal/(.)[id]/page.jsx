import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '../../../../dummy-news';
import Modal from '../../../../components/Modal';

export default async function InterceptedNewsDetailPage({ params }) {
  const { id: newsSlug } = await params;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <Modal>
      <article className="modal-article">
        <header className="modal-header">
          <div className="modal-image">
            <img
              src={`/images/slideshow/${newsItem.image}`}
              alt={newsItem.title}
            />
          </div>
          <h1>{newsItem.title}</h1>
        </header>
        <p>{newsItem.content}</p>
      </article>
    </Modal>
  );
}
