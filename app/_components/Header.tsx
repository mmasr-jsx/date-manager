import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="border-b border-primary-900 bg-white">
      <div className="flex justify-between items-center px-8 py-5 max-w-[90rem] mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}