'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Logo from '../_components/Logo';

export default function LoginPage() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const result = await signIn('credentials', {
        redirect: false, // Do not redirect on error, handle it manually
        mail,
        password,
      });

      if (result?.error) {
        setError(result.error);
        toast.error('Error al iniciar sesión: ' + result.error);
      } else if (result?.ok) {
        // Successful login
        toast.success('¡Inicio de sesión exitoso!');
        router.push('/calendar'); // Redirect to a protected page after login
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred.');
      toast.error('Error desconocido al iniciar sesión.');
    }
  };

  return (
    <div className="flex flex-col min-h-fit items-center justify-center px-8 py-12">
      <div className="w-40 mb-16">
        <Logo width={160} height={160} />
      </div>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="mail"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="mail"
              name="mail"
              type="email"
              autoComplete="email"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
