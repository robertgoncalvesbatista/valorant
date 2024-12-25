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
  const [first, seccond, third, fourth] = backgroundGradientColors;

  const linearGradient = `to bottom, #${first}, #${seccond}, #${third}, #${fourth}`;

  return (
    <ModalOverlay
      $open={open}
      className="w-full h-full justify-center items-center"
    >
      <ModalContent $bgColor={linearGradient}>
        <CloseButton
          className="absolute flex justify-center items-center w-[13px] h-[13px]"
          onClick={() => setOpen(false)}
        >
          &#x2715;
        </CloseButton>

        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
