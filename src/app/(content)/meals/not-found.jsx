import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="error-content">
      <h1>Meal not found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
      <Link href="/meals" className="button">
        Back to Meals
      </Link>
    </main>
  );
}
