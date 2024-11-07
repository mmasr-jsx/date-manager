import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-2xl text-background-50 font-semibold">
      <ul className="flex gap-16 items-center">
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
            href="/dashboard"
            className="hover:text-accent-400 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-accent-400 transition-colors">
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}
