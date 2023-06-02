import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StyledNotAllowed, StyledErrorImg } from '../styles/pages/StyledErrorPage';

import notFound from '../assets/404.jpg';
import notAllowed from '../assets/notAllowed.png';

const ErrorPage = ({ error }: { error?: number }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer < 1) {
      navigate('/login');
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <StyledNotAllowed>
      <StyledErrorImg
        src={error === 401 ? notAllowed : notFound}
        alt='404 error - page not found'
      />
      <h3>Redirecting to the login page... {timer}</h3>
      <Link to='/login'>
        <Button type='primary'>Go to login page</Button>
      </Link>
    </StyledNotAllowed>
  );
};

export default ErrorPage;
