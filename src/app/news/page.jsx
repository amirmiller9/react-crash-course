import Link from 'next/link';

export default function NewsPage() {
  return (
    <main>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="/news/item-1">News Item 1</Link>
        </li>
        <li>
          <Link href="/news/item-2">News Item 2</Link>
        </li>
        <li>
          <Link href="/news/item-3">News Item 3</Link>
        </li>
      </ul>
    </main>
  );
}
