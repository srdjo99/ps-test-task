import { FC } from 'react';
import { Spin } from 'antd';

interface SpinnerProps {
  size: 'small' | 'default' | 'large' | undefined;
}

const Spinner: FC<SpinnerProps> = ({ size = 'default' }) => <Spin size={size} />;

export default Spinner;
