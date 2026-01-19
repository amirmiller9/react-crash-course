import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="error-content">
      <h1>Page not found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
      <Link href="/" className="button">
        Go Home
      </Link>
    </main>
  );
}
