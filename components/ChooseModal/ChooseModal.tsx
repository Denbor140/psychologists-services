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
  const [mode] = useState<ModalMode>(initialMode);

  return (
    <Modal onClose={onClose}>
      {(close) => (
        <>
          {mode === "login" && <LoginForm onSuccess={close} onClose={close} />}

          {mode === "register" && (
            <RegisterForm onSuccess={close} onClose={close} />
          )}

          {mode === "appointment" && (
            <MakeAppointmentForm psychologist={psychologist} onClose={close} />
          )}
        </>
      )}
    </Modal>
  );
}
