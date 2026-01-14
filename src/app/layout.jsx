import './globals.css';
import MainHeader from '../components/MainHeader';
import MainHeaderBackground from '../components/MainHeaderBackground';

export const metadata = {
  title: 'React Poster',
  description: 'A simple social media app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
