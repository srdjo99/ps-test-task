import { Button, Form, Input, message } from 'antd';

import Spinner from './Spinner';
import { login } from '../store/slices/authSlice';
import { getUser } from '../store/thunks/authThunk';
import { FormData, PayloadData } from '../types/User.type';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { StyledForm } from '../styles/components/StyledLoginForm';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading } = useAppSelector((state) => state.userData);

  const errorNotification = (content: string) => {
    messageApi.open({
      type: 'error',
      content,
    });
  };

  const onFinish = async (e: FormData) => {
    try {
      const { payload } = (await dispatch(getUser())) as PayloadData;
      const isAuthenticated = payload.user_name === e.user_name && payload.password === e.password;
      if (isAuthenticated) {
        dispatch(login());
      } else {
        errorNotification('Wrong credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner size='large' />;
  }
  return (
    <>
      {contextHolder}
      <StyledForm layout='vertical' onFinish={onFinish} autoComplete='off'>
        <Form.Item
          label='Username'
          name='user_name'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  );
};

export default LoginForm;
