import Image from "next/image";
import bgLogo from "../public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bgLogo}
        fill
        alt="Doggie logo"
        className="object-cover object-top"
        priority
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-cyan-100 text-primary-50 mb-10 tracking-tight font-normal">
          Welcome user X
        </h1>
      </div>
    </main>
  );
}
