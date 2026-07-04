"use client";

import AuthModal from "../AuthModal/AuthModal";
import css from "./AuthButtons.module.css";
import { useState } from "react";

type AuthMode = "login" | "register" | null;

export default function AuthButtons() {
  const [mode, setMode] = useState<AuthMode>(null);

  return (
    <>
      <div className={css.header_btn_container}>
        <button className={css.btn_log_in} onClick={() => setMode("login")}>
          Log In
        </button>
        <button
          className={css.btn_register}
          onClick={() => setMode("register")}
        >
          Registration
        </button>
      </div>

      {mode && <AuthModal initialMode={mode} onClose={() => setMode(null)} />}
    </>
  );
}
