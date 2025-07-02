import logo from '../../public/Freya_logo.png';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  fill?: boolean;
}

export default function Logo({ children, width = 80, height = 80 }: Props) {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 group">
      <Image
        src={logo}
        height={width}
        width={height}
        quality={100}
        alt="Freya logo"
        className="rounded-full"
      />

      <span className="text-3xl font-semibold text-detail-0 group-hover:text-accent-400">
        {children}
      </span>
    </Link>
  );
}
