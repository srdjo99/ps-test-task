import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUser } from '../store/thunks/authThunk';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, error, isLoading } = useAppSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return {
    user,
    error,
    isLoading,
  };
};
