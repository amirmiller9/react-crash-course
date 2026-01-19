import { NextResponse } from 'next/server';
import { getMeal } from '@/lib/meals';

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const meal = getMeal(slug);
    if (!meal) {
      return NextResponse.json({ message: 'Meal not found.' }, { status: 404 });
    }
    return NextResponse.json(meal);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch meal.' }, { status: 500 });
  }
}
