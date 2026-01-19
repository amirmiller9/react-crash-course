import { NextResponse } from 'next/server';
import { getLatestNews } from '@/lib/news';

export async function GET() {
  const latestNews = await getLatestNews();
  return NextResponse.json(latestNews);
}
