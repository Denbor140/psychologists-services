import { useEffect, useState } from "react";
import css from "./BurgerMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useModal } from "../ModalProvider/ModalProvider";
import UserBar from "../UserBar/UserBar";
import AuthButtons from "../AuthButtons/AuthButtons";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function BurgerMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { currentUser, loading } = useAuth();
  const { openModal } = useModal();
  const [open, isOpen] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => isOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const closeForBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      isOpen(false);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!currentUser) {
      e.preventDefault();
      openModal("login", { redirect: "/favorites" });
      isOpen(false);
      return;
    }
    isOpen(false);
  };
  return createPortal(
    <div className={css.backdrop} onClick={closeForBackDrop}>
      <div
        className={`${css.burger_menu} ${open ? css.burger_menu_open : ""}`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={() => {
          if (!open) {
            onClose();
          }
        }}
      >
        <header className={css.menu_header}>
          <Link href={"/"} className={css.logo} onClick={onClose}>
            <span>psychologists</span>
            <span>.</span>
            <span>services</span>
          </Link>
          <button type="button" onClick={onClose}>
            <X width={20} height={20} strokeWidth={2.5} />
          </button>
        </header>

        <nav className={css.nav}>
          <Link
            href={"/"}
            className={`${css.nav_link} ${pathname === "/" ? css.nav_link_active : ""}`}
            onClick={onClose}
          >
            Home
          </Link>

          <Link
            href={"/psychologists"}
            className={`${css.nav_link} ${pathname === "/psychologists" ? css.nav_link_active : ""}`}
            onClick={onClose}
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

        <div className={css.auth_slot} onClick={onClose}>
          {loading ? (
            <div className={css.auth_placeholder} />
          ) : currentUser ? (
            <UserBar />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
