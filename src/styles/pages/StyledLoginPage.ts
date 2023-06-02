import styled from 'styled-components';
import bgImage from '../../assets/login-bg.jpg';

const StyledLoginPage = styled.div`
  width: 100%;
  height: 100dvh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { StyledLoginPage };
