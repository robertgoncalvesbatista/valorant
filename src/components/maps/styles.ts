import styled from "styled-components";

export const MapList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  max-height: 420px;
  overflow-y: auto;
  padding: 2px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MapOption = styled.button<{ $selected: boolean }>`
  position: relative;
  min-height: 80px;
  overflow: hidden;
  border: 1px solid
    ${(props) => (props.$selected ? "var(--primary)" : "var(--border)")};
  border-radius: 12px;
  background: var(--surface);
  color: var(--foreground);
  text-align: left;
  box-shadow: ${(props) =>
    props.$selected
      ? "0 0 0 1px rgba(255, 70, 85, 0.38), 0 8px 24px rgba(0, 0, 0, 0.24)"
      : "0 8px 20px rgba(0, 0, 0, 0.12)"};
  transition:
    border-color 180ms ease,
    background 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(180deg, transparent 22%, rgba(7, 9, 14, 0.34) 58%, rgba(7, 9, 14, 0.94));
  }

  > span:first-of-type {
    position: absolute;
    z-index: 2;
    bottom: 8px;
    left: 12px;
    font-size: 14px;
    font-weight: 700;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  }

  > span:last-of-type:not(:first-of-type) {
    position: absolute;
    z-index: 2;
    top: 8px;
    right: 8px;
    border-radius: 999px;
    background: var(--primary);
    padding: 4px 8px;
    color: #0b0d12;
    font-size: 10px;
    font-weight: 800;
  }
`;

export const MapOptionImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88) contrast(1.08) brightness(0.82);
`;
