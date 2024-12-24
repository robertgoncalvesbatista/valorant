import styled from "styled-components";

export const StyledImage = styled.img`
  transition: 0.1s ease-in-out;

  width: 30px;
  height: 30px;

  object-fit: cover;

  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;
