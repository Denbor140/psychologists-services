"use client";
import Link from "next/link";
import css from "./NavItem.module.css";
import { usePathname } from "next/navigation";

export default function NavItem() {
  const pathname = usePathname();

  return (
    <nav className={css.nav}>
      <Link
        href={"/"}
        className={`${css.nav_link} ${pathname === "/" ? css.nav_link_active : ""}`}
      >
        Home
      </Link>

      <Link
        href={"/"}
        className={`${css.nav_link} ${pathname === "/psychologists" ? css.nav_link_active : ""}`}
      >
        Psychologists
      </Link>

      <Link
        href={"/"}
        className={`${css.nav_link} ${pathname === "/favorites" ? css.nav_link_active : ""}`}
      >
        Favorites
      </Link>
    </nav>
  );
}
