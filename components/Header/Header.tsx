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

          <div className={css.header_btn_container}>
            <button className={css.btn_log_in}>Log In</button>
            <button className={css.btn_register}>Registration</button>
          </div>
        </div>
      </div>
    </header>
  );
}
