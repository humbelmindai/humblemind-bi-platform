import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ClientAuthProvider } from '@/components/auth/client-auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HumbleMind Unified Platform',
  description: 'Complete technology ecosystem for business intelligence, e-commerce, and service management',
  keywords: 'business intelligence, analytics, e-commerce, AI, South Africa, technology platform',
  authors: [{ name: 'HumbleMind AI Labs' }],
  robots: 'index, follow',
  openGraph: {
    title: 'HumbleMind Unified Platform',
    description: 'Complete technology ecosystem for business intelligence, e-commerce, and service management',
    type: 'website',
    locale: 'en_ZA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
