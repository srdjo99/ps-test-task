import styled from 'styled-components';
import { Form, InputNumber } from 'antd';

const StyledForm = styled(Form)`
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 500px;
  height: auto;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 9999;
  padding: 24px;
  border-radius: 10px;
`;

const StyledFormInput = styled(InputNumber)`
  width: 200px;
`;

export { StyledForm, StyledFormInput };
