import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect, useState, type ReactNode } from "react";

interface ModalProps {
  children: (close: () => void) => ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setOpen(true));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setOpen(false);
  };

  const closeForBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const closeForKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", closeForKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeForKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div
      className={`${css.backdrop} ${open ? css.backdrop_open : ""} `}
      role="dialog"
      aria-modal="true"
      onClick={closeForBackDrop}
      onTransitionEnd={() => {
        if (closing) onClose();
      }}
    >
      <div className={css.modal}>{children(handleClose)}</div>
    </div>,
    document.body,
  );
}
