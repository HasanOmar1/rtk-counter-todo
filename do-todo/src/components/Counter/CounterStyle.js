import styled from "styled-components";

export const Main = styled.main`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  font-size: 2rem;
  flex-direction: column;
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 30px;
  padding-top: 60px;
`;

export const Button = styled.button`
  padding: 20px;
  color: white;
  font-size: 2rem;
  color: ${(props) =>
    props.$green
      ? "green"
      : props.$red
      ? "red"
      : props.$cyan
      ? "cyan"
      : props.$pink
      ? "pink"
      : ""};

  &:hover {
    transform: scale(1.2);
  }
`;
