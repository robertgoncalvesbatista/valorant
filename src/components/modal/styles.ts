import styled from "styled-components";

export const ModalOverlay = styled.dialog<{ $open: boolean; $bgColor: string }>`
  width: min(calc(100% - 32px), 720px);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0;
  background:
    ${(props) => `linear-gradient(135deg, rgba(9, 12, 18, 0.86), rgba(32, 39, 54, 0.94)), linear-gradient(${props.$bgColor})`};
  color: var(--foreground);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.56);

  &::backdrop {
    background: rgba(7, 8, 12, 0.82);
  }

  &[open] {
    animation: modal-in 180ms ease-out;
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalContent = styled.div`
  position: relative;
  min-height: 320px;
  padding: 24px;
`;

export const CloseButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 12px;
  right: 12px;
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(11, 13, 18, 0.88);
  padding: 8px 12px;
  color: var(--foreground);
  font-size: 14px;
  font-weight: 700;
`;
