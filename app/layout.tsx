'use client';

import '../styles/global.css';
import { Toaster } from 'sonner';
import Header from './_components/Header';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-0 text-primary-100 min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <div className="flex-1 grid">
            <main className="w-full text-black space-y-24">{children}</main>
          </div>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: {
                fontSize: '1.2rem',
                padding: '20px',
                minWidth: '400px',
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
