'use client';

import Link from 'next/link';
import UserIcon from './icons/UserIcon';
import { useSession } from 'next-auth/react';

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <nav
      className="z-10 text-2xl text-detail-0 font-semibold
    "
    >
      <ul className="flex gap-16 items-end">
        {status === 'authenticated' && session?.user?.role === 'admin' ? (
          <>
            <li>
              <Link
                href="/clientes"
                className="hover:text-accent-400 transition-colors"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/mascotas"
                className="hover:text-accent-400 transition-colors"
              >
                Mascotas
              </Link>
            </li>
            <li>
              <Link
                href="/calendar"
                className="hover:text-accent-400 transition-colors"
              >
                Calendario
              </Link>
            </li>
          </>
        ) : (
          ''
        )}

        <li>
          <Link href="/" className="hover:text-accent-400 transition-colors">
            About us
          </Link>
        </li>
        <li>
          {status === 'authenticated' ? (
            <Link href="/logout" className="group flex items-end gap-2">
              <UserIcon hover={true} />
              <span className="text-base group-hover:text-accent-400 transition-colors">
                {session?.user?.name
                  ? 'Hola ' + session?.user?.name + '!'
                  : 'Conectate!'}
              </span>
            </Link>
          ) : (
            <Link href="/login" className="group flex items-end gap-2">
              <UserIcon hover={true} />
              <span className="text-base group-hover:text-accent-400 transition-colors">
                Conectate!
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
