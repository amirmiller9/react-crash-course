import { DUMMY_NEWS } from '../dummy-news';

export async function getAllNews() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS;
}

export async function getLatestNews() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS.slice(0, 3);
}

export async function getAvailableNewsYears() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export async function getAvailableNewsMonths(year) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS.reduce((months, news) => {
    const newsDate = new Date(news.date);
    if (newsDate.getFullYear() === +year) {
      const month = newsDate.getMonth() + 1;
      if (!months.includes(month)) {
        months.push(month);
      }
    }
    return months;
  }, []).sort((a, b) => a - b);
}

export async function getNewsForYear(year) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

export async function getNewsForYearAndMonth(year, month) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return DUMMY_NEWS.filter((news) => {
    const newsDate = new Date(news.date);
    return (
      newsDate.getFullYear() === +year && newsDate.getMonth() + 1 === +month
    );
  });
}
