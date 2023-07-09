"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { name: string; href: string };

const items: Item[] = [
  { name: "Dashboard", href: "/" },
  { name: "Decks", href: "/decks" },
];

type ItemProps = Item;

const Item: FC<ItemProps> = ({ name, href }) => {
  const pathname = usePathname();

  const isCurrent = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-all hover:bg-neutral-800 py-2 px-3 rounded-lg ${
        isCurrent ? "bg-neutral-800" : ""
      }`}
    >
      {name}
    </Link>
  );
};

const Navbar: FC = () => {
  return (
    <nav className="shadow-[rgb(48,_54,_61)_0px_-1px_0px_0px_inset] flex flex-row gap-3 px-4 py-5">
      {items.map((item) => (
        <Item key={item.name} {...item} />
      ))}
    </nav>
  );
};

export default Navbar;
