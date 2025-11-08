import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TimelineDB - Git for Databases',
  description: 'Time travel, instant branching, and zero-copy forks for databases. Powered by Tiger Agentic Postgres.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
