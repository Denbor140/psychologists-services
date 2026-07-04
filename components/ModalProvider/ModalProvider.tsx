"use client";

import { createContext, useContext, useState } from "react";
import AuthModal from "@/components/AuthModal/AuthModal";

type AuthMode = "login" | "register";

interface ModalContextType {
  openAuthModal: (mode: AuthMode, redirect?: string) => void;
  closeAuthModal: () => void;
  redirectPath: string | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const openAuthModal = (mode: AuthMode, redirect?: string) => {
    setRedirectPath(redirect ?? null);
    setMode(mode);
  };

  const closeAuthModal = () => {
    setMode(null);
    setRedirectPath(null);
  };

  return (
    <ModalContext.Provider
      value={{ openAuthModal, closeAuthModal, redirectPath }}
    >
      {children}

      {mode && <AuthModal initialMode={mode} onClose={closeAuthModal} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
}
