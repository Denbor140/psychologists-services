import { useState } from "react";
import css from "./BurgerMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useModal } from "../ModalProvider/ModalProvider";
import UserBar from "../UserBar/UserBar";
import AuthButtons from "../AuthButtons/AuthButtons";

export default function BurgerMenu() {
  const pathname = usePathname();
  const { currentUser, loading } = useAuth();
  const { openModal } = useModal();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
      e.preventDefault();
      openModal("login", { redirect: "/favorites" });
      return;
    }
  };
  return (
    <div className={css.backdrop}>
      <div className={`${css.burger_menu} `}>
        <header className={css.menu_header}>
          <Link href={"/"} className={css.logo}>
            <span>psychologists</span>
            <span>.</span>
            <span>services</span>
          </Link>
        </header>

        <nav className={css.menu_nav}>
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

        <div className={css.auth_slot}>
          {loading ? (
            <div className={css.auth_placeholder} />
          ) : currentUser ? (
            <UserBar />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </div>
  );
}
