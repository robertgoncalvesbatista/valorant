import styled from "styled-components";

export const StyledModal = styled.div<{ $open: boolean }>`
  display: ${(props) => (props.$open ? "flex" : "none")};

  position: fixed;
  z-index: 1;
  top: 0;
  backdrop-filter: blur(10px);

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const Card = styled.div<{ $bgColor: string }>`
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
  position: absolute;

  top: 10px;
  right: 10px;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 13px;
  height: 13px;
`;
