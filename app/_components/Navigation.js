import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-2xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/dashboard"
            className="hover:text-accent-400 transition-colors"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}