import { useEffect, useRef } from "react";

import { ModalContent, CloseButton, ModalOverlay } from "./styles";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundGradientColors: string[];
  children: React.ReactNode;
};

export default function Modal({
  open,
  setOpen,
  backgroundGradientColors,
  children,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [first, seccond, third, fourth] = backgroundGradientColors;
  const gradientColors = [first, seccond, third, fourth]
    .filter(Boolean)
    .map((color) => `#${color}`);
  const linearGradient =
    gradientColors.length >= 2
      ? `135deg, ${gradientColors.join(", ")}`
      : "135deg, #202736, #111620";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      triggerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  const closeModal = () => setOpen(false);

  return (
    <ModalOverlay
      ref={dialogRef}
      $open={open}
      $bgColor={linearGradient}
      aria-label="Detalhes do personagem"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <ModalContent>
        <CloseButton
          type="button"
          onClick={closeModal}
          aria-label="Fechar detalhes"
        >
          <span aria-hidden="true">Fechar</span>
          <span aria-hidden="true" className="text-lg">×</span>
        </CloseButton>

        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
