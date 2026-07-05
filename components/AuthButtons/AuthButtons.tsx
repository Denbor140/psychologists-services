"use client";

import { useModal } from "../ModalProvider/ModalProvider";
import css from "./AuthButtons.module.css";

export default function AuthButtons() {
  const { openModal } = useModal();

  return (
    <div className={css.header_btn_container}>
      <button className={css.btn_log_in} onClick={() => openModal("login")}>
        Log In
      </button>
      <button
        className={css.btn_register}
        onClick={() => openModal("register")}
      >
        Registration
      </button>
    </div>
  );
}
