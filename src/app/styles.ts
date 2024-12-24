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

export const AgentCard = styled.div<{ $name: string }>`
  width: 235px;
  height: 343px;
`;

export const AgentImage = styled.img`
  filter: drop-shadow(2px 4px 6px black);
  transition: 0.2s ease-in-out;

  max-width: -webkit-fill-available;
  height: 254px;
  object-fit: cover;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;
