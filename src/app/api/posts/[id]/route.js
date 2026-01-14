import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:8080/posts/${id}`, {
    next: { revalidate: 0 }
  });
  const data = await response.json();
  return NextResponse.json(data);
}