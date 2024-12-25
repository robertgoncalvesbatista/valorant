import styled, { keyframes } from "styled-components";

// Keyframes para animações de fade in e fade out
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ModalOverlay = styled.div<{ $open: boolean }>`
  display: ${(props) => (props.$open ? "flex" : "none")};

  position: fixed;
  z-index: 1;
  top: 0;
  background: rgba(0, 0, 0, 0.5);

  animation: ${(props) => (!props.$open ? fadeOut : fadeIn)} 0.5s forwards;
`;

export const ModalContent = styled.div<{ $bgColor: string }>`
  position: relative;

  max-width: 250px;
  width: 100%;

  min-height: 300px;

  background-image: linear-gradient(${(props) => props.$bgColor});
  border-radius: 8px;
  padding: 1rem;

  @media (min-width: 900px) {
    max-width: 600px;
  }
`;

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;

  color: white;
`;
