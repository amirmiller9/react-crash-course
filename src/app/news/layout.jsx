export default function NewsLayout({ children, archive, latest, modal }) {
  return (
    <div>
      <h1>News</h1>
      {modal}
      <section id="archive-filter">{archive}</section>
      <section id="latest-news">{latest}</section>
      {children}
    </div>
  );
}
