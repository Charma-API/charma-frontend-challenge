import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recipe Finder | Discover Delicious Meals',
  description: 'Explore thousands of recipes from around the world. Search, filter by category, and save your favorites.',
  keywords: ['recipes', 'cooking', 'meals', 'food', 'cuisine'],
  openGraph: {
    title: 'Recipe Finder',
    description: 'Discover delicious recipes from around the world',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen text-stone-100">
        {children}
      </body>
    </html>
  );
}
