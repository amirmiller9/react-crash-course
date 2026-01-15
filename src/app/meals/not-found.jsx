import MealsHeader from '../../components/MealsHeader';

export default function NotFound() {
  return (
    <main className="not-found">
      <MealsHeader title="Meal not found">
        <p>Unfortunately, we could not find the requested page or meal data.</p>
      </MealsHeader>
    </main>
  );
}
