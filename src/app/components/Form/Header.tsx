import Image from "next/image";
import logo from "../../public/logo-2.png"; // adjust relative path from this file

interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="relative flex flex-col gap-2 sm:gap-3">
      <h1 className="text-denim font-bold text-2xl sm:text-3xl">{title}</h1>
      <p className="text-grey font-normal text-base">{description}</p>
    </header>
  );
}
