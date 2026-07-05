"use client";

import { createContext, useContext, useState } from "react";
import ChooseModal from "@/components/ChooseModal/ChooseModal";
import { Psychologist } from "@/types/psychologist";

type ModalMode = "login" | "register" | "appointment";

interface ModalContextType {
  openModal: (
    mode: ModalMode,
    options?: { redirect?: string; psychologist?: Psychologist },
  ) => void;
  closeModal: () => void;
  redirectPath: string | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const openModal = (
    mode: ModalMode,
    options?: { redirect?: string; psychologist?: Psychologist },
  ) => {
    setRedirectPath(options?.redirect ?? null);
    setSelectedPsychologist(options?.psychologist ?? null);
    setMode(mode);
  };

  const closeModal = () => {
    setMode(null);
    setRedirectPath(null);
    setSelectedPsychologist(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, redirectPath }}>
      {children}

      {mode && (
        <ChooseModal
          initialMode={mode}
          onClose={closeModal}
          psychologist={selectedPsychologist ?? undefined}
        />
      )}
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
