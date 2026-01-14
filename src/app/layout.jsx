import './globals.css';

export const metadata = {
  title: 'React Poster',
  description: 'A simple social media app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
