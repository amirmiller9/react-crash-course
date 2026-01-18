import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="error-content">
      <h1>News not found</h1>
      <p>Unfortunately, we could not find the requested news article.</p>
      <Link href="/news" className="button">
        Back to News
      </Link>
    </main>
  );
}
