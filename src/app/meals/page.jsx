import Link from 'next/link';

export default function MealsPage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Meals Page</h1>
      <p>Delicious meals, created by you.</p>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/meals/share" className="button" style={{
          background: '#a67c52',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          color: '#1a0c03',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Share Your Favorite Recipe
        </Link>
      </p>
    </main>
  );
}
