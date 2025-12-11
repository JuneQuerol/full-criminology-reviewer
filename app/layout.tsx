
import type { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const PageLoader = dynamic(() => import('../components/PageLoader'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pinoycrim-reviewer.vercel.app'),
  title: 'Pinoy Crim Reviewer - Criminology Board Exam',
  description:
    'The ultimate online reviewer for the Criminology Licensure Examination (CLE). Review anytime, anywhere.',
  openGraph: {
    title: 'Pinoy Crim Reviewer - Criminology Board Exam',
    description: 'The ultimate online reviewer for the CLE.',
    url: 'https://pinoycrim-reviewer.vercel.app',
    siteName: 'Pinoy Crim Reviewer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4225764258903216"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans bg-brand-light dark:bg-gray-900 overflow-x-hidden`}
      >
        <PageLoader />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 bg-white dark:bg-gray-800/50 shadow-inner overflow-x-hidden">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
