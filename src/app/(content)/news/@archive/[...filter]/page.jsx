import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '../../../../../lib/news';
import classes from '../../page.module.css';

async function FilteredHeader({ selectedYear, selectedMonth }) {
  const availableYears = await getAvailableNewsYears();
  let availableMonths = [];

  if (selectedYear) {
    availableMonths = await getAvailableNewsMonths(selectedYear);
  }

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !availableMonths.includes(selectedMonth))
  ) {
    return (
      <header id="archive-header">
        <nav>
          <ul>
            {availableYears.map((year) => (
              <li key={year}>
                <Link href={`/news/${year}`}>{year}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>Invalid filter.</p>
      </header>
    );
  }

  let links = availableYears;

  if (selectedYear && !selectedMonth) {
    links = availableMonths;
  }

  if (selectedYear && selectedMonth) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = selectedYear
              ? `/news/${selectedYear}/${link}`
              : `/news/${link}`;

            const isActive =
              (selectedYear === link && !selectedMonth) ||
              (selectedMonth === link);

            return (
              <li key={link}>
                <Link
                  href={href}
                  className={isActive ? 'active' : undefined}
                >
                  {link}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ selectedYear, selectedMonth }) {
  let news;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
  } else if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
  }

  let newsContent = <p>No news found for the selected period.</p>;

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

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const { filter } = await params;

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  if (filter?.length > 2) {
    notFound();
  }

  return (
    <>
      <h1>News Archive</h1>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilteredHeader selectedYear={selectedYear} selectedMonth={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews selectedYear={selectedYear} selectedMonth={selectedMonth} />
      </Suspense>
    </>
  );
}
