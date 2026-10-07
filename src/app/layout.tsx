import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ThinkWords — A world of its own',
  description:
    'From the moment you arrive, the noise outside fades. Give us a word and a feeling — we craft a line worth keeping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
