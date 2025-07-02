'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' }); // Redirect to the homepage after logout
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-8 py-12">
      <p className="text-lg font-semibold">Cerrando sesión...</p>
    </div>
  );
}
