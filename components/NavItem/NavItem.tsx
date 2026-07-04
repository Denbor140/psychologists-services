"use client";
import Link from "next/link";
import css from "./NavItem.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useModal } from "@/components/ModalProvider/ModalProvider";

export default function NavItem() {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { openAuthModal } = useModal();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
      e.preventDefault();
      openAuthModal("login", "/favorites");
      return;
    }
  };

  return (
    <nav className={css.nav}>
      <Link
        href={"/"}
        className={`${css.nav_link} ${pathname === "/" ? css.nav_link_active : ""}`}
      >
        Home
      </Link>

      <Link
        href={"/psychologists"}
        className={`${css.nav_link} ${pathname === "/psychologists" ? css.nav_link_active : ""}`}
      >
        Psychologists
      </Link>

      <Link
        href={"/favorites"}
        className={`${css.nav_link} ${pathname === "/favorites" ? css.nav_link_active : ""}`}
        onClick={handleClick}
      >
        Favorites
      </Link>
    </nav>
  );
}
