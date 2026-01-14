import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://localhost:8080/posts', {
    next: { revalidate: 0 }
  });
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request) {
  const postData = await request.json();
  const response = await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return NextResponse.json(data, { status: 201 });
}