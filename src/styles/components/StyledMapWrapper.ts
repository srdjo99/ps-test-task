import styled from 'styled-components';
import { Button } from 'antd';

const StyledMapWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  z-index: 9999;
  position: absolute;
  top: 200px;
  left: 10px;
`;

export { StyledMapWrapper, StyledButton };
