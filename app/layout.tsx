import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fortify - AI-Powered Security Analysis',
  description: 'Advanced security analysis powered by Tiger Agentic Postgres with multi-agent AI system',
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
