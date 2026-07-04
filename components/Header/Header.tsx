import AuthButtons from "../AuthButtons/AuthButtons";
import NavItem from "../NavItem/NavItem";
import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
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

          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
