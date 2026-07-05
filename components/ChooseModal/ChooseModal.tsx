"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import MakeAppointmentForm from "../MakeAppointmentForm/MakeAppointmentForm";
import { Psychologist } from "@/types/psychologist";

type ModalMode = "login" | "register" | "appointment";

interface ChooseModalProps {
  psychologist?: Psychologist;
  initialMode: ModalMode;
  onClose: () => void;
}

export default function ChooseModal({
  psychologist,
  initialMode,
  onClose,
}: ChooseModalProps) {
  const [mode, setMode] = useState<ModalMode>(initialMode);

  return (
    <Modal
      onClose={onClose}
      maxWidth={mode === "appointment" ? 600 : undefined}
    >
      {mode === "login" && <LoginForm onSuccess={onClose} onClose={onClose} />}
      {mode === "register" && (
        <RegisterForm onSuccess={onClose} onClose={onClose} />
      )}
      {mode === "appointment" && (
        <MakeAppointmentForm psychologist={psychologist} onClose={onClose} />
      )}
    </Modal>
  );
}
