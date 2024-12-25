import { Card, CloseButton, StyledModal } from "./styles";

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
