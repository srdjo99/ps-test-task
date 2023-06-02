import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

import Map from '../pages/Map';
import Login from '../pages/Login';
import ErrorPage from '../pages/Error';

const Router = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userData);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/map' element={isLoggedIn ? <Map /> : <ErrorPage error={401} />} />
      <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to='/map' replace />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
