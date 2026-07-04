"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

type AuthMode = "login" | "register";

interface AuthModalProps {
  initialMode: AuthMode;
  onClose: () => void;
}

export default function AuthModal({ initialMode, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <Modal onClose={onClose}>
      {mode === "login" ? (
        <LoginForm onSuccess={onClose} onClose={onClose} />
      ) : (
        <RegisterForm onSuccess={onClose} onClose={onClose} />
      )}
    </Modal>
  );
}
