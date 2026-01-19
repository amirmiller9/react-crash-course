import { NextResponse } from 'next/server';
import { getNewsItem } from '@/lib/news';

export async function GET(request, { params }) {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    return NextResponse.json({ message: 'News item not found.' }, { status: 404 });
  }

  return NextResponse.json(newsItem);
}
