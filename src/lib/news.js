import sql from 'better-sqlite3';

const db = sql('meals.db');
db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS news (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    date TEXT NOT NULL,
    content TEXT NOT NULL
  )
`).run();

const count = db.prepare('SELECT COUNT(*) as count FROM news').get().count;

if (count === 0) {
  const initialNews = [
    {
      id: 'n1',
      slug: 'will-ai-replace-humans',
      title: 'Will AI Replace Humans?',
      image: 'burger.jpg',
      date: '2021-07-01',
      content:
        'AI is advancing rapidly, but can it truly replace the human touch? This article explores the current state of AI and what it means for the future of work and creativity.',
    },
    {
      id: 'n2',
      slug: 'the-rise-of-react',
      title: 'The Rise of React',
      image: 'curry.jpg',
      date: '2022-08-15',
      content:
        'React has become one of the most popular libraries for building user interfaces. We take a look at why it’s so widely used and what the future holds for this powerful tool.',
    },
    {
      id: 'n3',
      slug: 'next-js-the-future-of-web-dev',
      title: 'Next.js: The Future of Web Dev',
      image: 'dumplings.jpg',
      date: '2024-09-20',
      content:
        'Next.js is taking the web development world by storm. With its focus on performance and developer experience, it’s no wonder it’s becoming the go-to framework for many.',
    },
    {
      id: 'n4',
      slug: 'a-plague-of-beavers',
      title: 'A Plague of Beavers',
      image: 'beaver.jpg',
      date: '2024-05-10',
      content:
        'Beavers are everywhere! This article explores the sudden surge in beaver populations and the impact they are having on local ecosystems.',
    },
    {
      id: 'n5',
      slug: 'the-beauty-of-landscape',
      title: 'The beauty of landscape',
      image: 'landscape.jpg',
      date: '2024-03-05',
      content:
        'Nature is truly beautiful. In this post, we showcase some of the most stunning landscapes from around the world.',
    },
  ];

  const insert = db.prepare(
    'INSERT INTO news (id, slug, title, image, date, content) VALUES (@id, @slug, @title, @image, @date, @content)'
  );
  for (const newsItem of initialNews) {
    insert.run(newsItem);
  }
}

export async function getAllNews() {
  return db.prepare('SELECT * FROM news').all();
}

export async function getLatestNews() {
  return db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
}

export async function getAvailableNewsYears() {
  const news = db.prepare('SELECT date FROM news').all();
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
}

export async function getAvailableNewsMonths(year) {
  const news = db.prepare('SELECT date FROM news').all();
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
}

export async function getNewsForYear(year) {
  const news = db.prepare('SELECT * FROM news').all();
  return news.filter(
    (newsItem) => new Date(newsItem.date).getFullYear() === +year
  );
}

export async function getNewsForYearAndMonth(year, month) {
  const news = db.prepare('SELECT * FROM news').all();
  return news.filter((newsItem) => {
    const newsDate = new Date(newsItem.date);
    return (
      newsDate.getFullYear() === +year && newsDate.getMonth() + 1 === +month
    );
  });
}

export async function getNewsItem(slug) {
  return db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);
}
