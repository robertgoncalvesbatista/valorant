import { Card, CloseButton, StyledModal } from "./styles";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundGradientColors: string[];
  children: React.ReactNode;
};

export function Modal({
  open = false,
  setOpen,
  backgroundGradientColors,
  children,
}: Props) {
  const [first, seccond, third, fourth] = backgroundGradientColors;

  const linearGradient = `to bottom, #${first}, #${seccond}, #${third}, #${fourth}`;

  return (
    <StyledModal $open={open}>
      <Card $bgColor={linearGradient}>
        <CloseButton onClick={() => setOpen(false)}>&#x2715;</CloseButton>

        {children}
      </Card>
    </StyledModal>
  );
}

export default Modal;
