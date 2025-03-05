import logo from "../../public/Freya_logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="80"
        width="80"
        quality={100}
        alt="Freya logo"
        className="rounded-full"
      />
      <span className="text-3xl font-semibold text-background-50">
        Peluqueria canina Freya
      </span>
    </Link>
  );
}
