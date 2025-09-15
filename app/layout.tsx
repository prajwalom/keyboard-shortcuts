import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shortcuts Hub - Master Keyboard Shortcuts for Maximum Productivity',
  description: 'Discover and master keyboard shortcuts for Windows, Mac, and Linux. Boost productivity with our comprehensive collection of shortcuts for browsers, development tools, and system operations.',
  keywords: 'keyboard shortcuts, hotkeys, productivity, Windows shortcuts, Mac shortcuts, Linux shortcuts, browser shortcuts, VS Code shortcuts, system shortcuts, development shortcuts',
  authors: [{ name: 'Keyboard Shortcuts Hub' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
  openGraph: {
    title: 'Shortcuts Hub - Master Keyboard Shortcuts',
    description: 'Discover and master keyboard shortcuts for maximum productivity across all platforms.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shortcuts Hub',
    description: 'Master keyboard shortcuts for maximum productivity across all platforms.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}