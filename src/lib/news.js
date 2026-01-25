import { cache } from 'react';
import sql from 'better-sqlite3';
import { unstable_cache } from 'next/cache';
import db from './db';

export const getAllNews = cache(async function getAllNews() {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM news').all(),
    ['news'],
    { tags: ['news'] }
  )();
});

export const getLatestNews = cache(async function getLatestNews() {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all(),
    ['latest-news'],
    { tags: ['news'], revalidate: 3600 }
  )();
});

export const getAvailableNewsYears = cache(async function getAvailableNewsYears() {
  const news = await getAllNews();
  return news
    .reduce((years, newsItem) => {
      const year = new Date(newsItem.date).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
      return years;
    }, [])
    .sort((a, b) => b - a)
    .map((y) => y.toString());
});

export const getAvailableNewsMonths = cache(async function getAvailableNewsMonths(year) {
  const news = await getAllNews();
  return news
    .reduce((months, newsItem) => {
      const newsDate = new Date(newsItem.date);
      if (newsDate.getFullYear() === +year) {
        const month = newsDate.getMonth() + 1;
        if (!months.includes(month)) {
          months.push(month);
        }
      }
      return months;
    }, [])
    .sort((a, b) => a - b)
    .map((m) => m.toString());
});

export const getNewsForYear = cache(async function getNewsForYear(year) {
  const news = await getAllNews();
  return news.filter(
    (newsItem) => new Date(newsItem.date).getFullYear() === +year
  );
});

export const getNewsForYearAndMonth = cache(async function getNewsForYearAndMonth(year, month) {
  const news = await getAllNews();
  return news.filter((newsItem) => {
    const newsDate = new Date(newsItem.date);
    return (
      newsDate.getFullYear() === +year && newsDate.getMonth() + 1 === +month
    );
  });
});

export const getNewsItem = cache(async function getNewsItem(slug) {
  return unstable_cache(
    async () => db.prepare('SELECT * FROM news WHERE slug = ?').get(slug),
    ['news-item', slug],
    { tags: [`news-item-${slug}`, 'news'] }
  )();
});
