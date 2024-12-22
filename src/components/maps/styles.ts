import styled from "styled-components";

export const ListViewMap = styled.div<{ $name: string }>`
  transition: 0.1s ease-in-out;
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }

  &:before {
    content: "${(props) => props.$name}";

    position: absolute;

    bottom: 10px;
    left: 15px;

    text-transform: uppercase;

    filter: drop-shadow(2px 4px 6px black);
  }
`;

export const ListViewMapImage = styled.img`
  width: 420px;
  height: 100px;
  object-fit: cover;

  &:hover {
    border: 2px solid #ff4654;
  }
`;
