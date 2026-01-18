export default function NewsDetailPage({ params }) {
  return (
    <main>
      <h1>News Item Detail</h1>
      <p>Displaying details for news item: {params.id}</p>
      <p>This is dummy text for the detail page.</p>
    </main>
  );
}
