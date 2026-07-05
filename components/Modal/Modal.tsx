import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: number;
}

export default function Modal({ children, onClose, maxWidth }: ModalProps) {
  const closeForBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const closeForKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeForKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeForKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={closeForBackDrop}
    >
      <div className={css.modal} style={maxWidth ? { maxWidth } : undefined}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
