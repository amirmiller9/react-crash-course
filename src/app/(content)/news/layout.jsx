export default function NewsLayout({ children, archive, latest, modal }) {
  return (
    <div>
      {modal}
      <section id="archive-filter">
        {archive}
      </section>
      <hr />
      <section id="latest-news">
        {latest}
      </section>
      {children}
    </div>
  );
}
