"use client";

import AuthButtons from "../AuthButtons/AuthButtons";
import NavItem from "../NavItem/NavItem";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function Header() {
  const { currentUser, loading } = useAuth();

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
