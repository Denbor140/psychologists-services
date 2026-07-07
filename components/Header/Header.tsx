"use client";

import AuthButtons from "../AuthButtons/AuthButtons";
import NavItem from "../NavItem/NavItem";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Menu } from "lucide-react";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const { currentUser, loading } = useAuth();
  const [open, isOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <Link href={"/"} className={css.logo}>
            <span>psychologists</span>
            <span>.</span>
            <span>services</span>
          </Link>

          <NavItem />

          <button
            type="button"
            className={css.burger_menu}
            onClick={() => isOpen(true)}
          >
            <Menu width={20} height={20} />
          </button>

          {open && <BurgerMenu onClose={() => isOpen(false)} />}

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
    </header>
  );
}
