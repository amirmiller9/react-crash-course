import { Suspense } from 'react';

export default function NewsLayout({ children, archive, latest, modal }) {
  return (
    <div>
      {modal}
      <section id="archive-filter">
        <Suspense fallback={<p>Loading archive...</p>}>
          {archive}
        </Suspense>
      </section>
      <hr />
      <section id="latest-news">
        <Suspense fallback={<p>Loading latest news...</p>}>
          {latest}
        </Suspense>
      </section>
      {children}
    </div>
  );
}
