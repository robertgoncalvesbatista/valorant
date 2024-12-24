import styled from "styled-components";

export const AgentCard = styled.div<{ $gradient: string; $name: string }>`
  filter: grayscale(1);
  transition: 0.2s ease-in-out;

  width: 235px;
  height: 343px;

  background-image: linear-gradient(${(props) => props.$gradient});

  &:hover {
    filter: grayscale(0);
    border: 2px solid #ff4654;
  }
`;

export const AgentImage = styled.img`
  filter: drop-shadow(2px 4px 6px black);
  transition: 0.2s ease-in-out;

  max-width: -webkit-fill-available;
  height: 254px;
  object-fit: cover;
`;
