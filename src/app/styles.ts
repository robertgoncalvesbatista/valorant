import styled from "styled-components";

export const BackgroundImage = styled.div<{ $url: string }>`
  position: relative;
  z-index: 1;

  &:before {
    content: "";

    position: absolute;
    z-index: -1;

    background-image: url(${(props) => props.$url});
    background-size: cover;

    filter: brightness(0.2);
  }
`;
