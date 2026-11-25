import styled from "styled-components";

export const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const AgentCard = styled.button<{ $gradient: string }>`
  position: relative;
  height: 280px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(7, 9, 14, 0.02), rgba(7, 9, 14, 0.18)),
    linear-gradient(${(props) => props.$gradient});
  color: var(--foreground);
  text-align: left;
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;

  &:before {
    content: "";
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    height: 34%;
    background: linear-gradient(180deg, transparent, rgba(7, 9, 14, 0.9));
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(255, 70, 85, 0.9);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 70, 85, 0.16);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AgentImage = styled.img`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 18px;
  height: 220px;
  max-width: 170%;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.55));
  transform: translateX(-50%);
  transition: transform 180ms ease;

  ${AgentCard}:hover & {
    transform: translateX(-50%) scale(1.02);
  }
`;

export const AgentName = styled.span`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(7, 9, 14, 0.9);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(6px);
  padding: 8px 9px;

  > span {
    overflow: hidden;
    font-size: 16px;
    font-weight: 800;
    text-overflow: ellipsis;
  }

  small {
    flex-shrink: 0;
    color: var(--foreground);
    font-size: 11px;
    opacity: 0.76;
  }
`;
