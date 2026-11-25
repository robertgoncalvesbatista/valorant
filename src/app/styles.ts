import styled from "styled-components";

export const BackgroundImage = styled.div<{ $url: string }>`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  background: var(--background);

  &:before {
    content: "";
    position: absolute;
    z-index: -2;
    inset: 0;
    background-image: url(${(props) => props.$url});
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.$url ? 0.14 : 0)};
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background:
      radial-gradient(circle at 78% 8%, rgba(255, 70, 85, 0.12), transparent 28rem),
      linear-gradient(145deg, rgba(18, 24, 36, 0.16), transparent 42%),
      linear-gradient(180deg, rgba(9, 12, 18, 0.62), rgba(9, 12, 18, 0.94));
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

export const AgentPortrait = styled.div`
  position: relative;
  flex: 0 0 235px;
  min-height: 343px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);

  &:after {
    content: "";
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    left: 0;
    height: 42%;
    background: linear-gradient(180deg, transparent, rgba(7, 9, 14, 0.94));
    pointer-events: none;
  }
`;

export const AgentPortraitImage = styled.img`
  position: absolute;
  z-index: 1;
  bottom: 24px;
  left: 50%;
  width: 235px;
  height: 300px;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 12px 16px rgba(0, 0, 0, 0.48));
  transform: translateX(-50%);
`;
