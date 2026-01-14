export default async function MealDetailsPage({ params }) {
  const { slug } = await params;
  
  return (
    <main>
      <h1>Meal Details</h1>
      <p>Viewing details for: {slug}</p>
    </main>
  );
}
