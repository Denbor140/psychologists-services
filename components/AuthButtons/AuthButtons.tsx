"use client";

import { useModal } from "../ModalProvider/ModalProvider";
import css from "./AuthButtons.module.css";

export default function AuthButtons() {
  const { openAuthModal } = useModal();

  return (
    <div className={css.header_btn_container}>
      <button className={css.btn_log_in} onClick={() => openAuthModal("login")}>
        Log In
      </button>
      <button
        className={css.btn_register}
        onClick={() => openAuthModal("register")}
      >
        Registration
      </button>
    </div>
  );
}
