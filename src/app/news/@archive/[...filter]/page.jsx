import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '../../../../lib/news';
import classes from '../../page.module.css';

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  const availableYears = await getAvailableNewsYears();
  let availableMonths = [];

  if (selectedYear) {
    availableMonths = await getAvailableNewsMonths(selectedYear);
  }

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth)) ||
    filter?.length > 2
  ) {
    throw new Error('Invalid filter.');
  }

  let news;
  let links = availableYears;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = availableMonths;
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = null;

  if (selectedYear) {
    newsContent = <p>No news found for the selected period.</p>;
  }

  if (news && news.length > 0) {
    newsContent = (
      <ul className={classes.news}>
        {news.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img
                src={`/images/slideshow/${newsItem.image}`}
                alt={newsItem.title}
              />
              <span className={classes.title}>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <header id="archive-header">
        <h1>News Archive</h1>
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/news/${selectedYear}/${link}`
                : `/news/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
