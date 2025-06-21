import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUser } from '../../signin/profileSlice';
import { clearUserData, loadUserData } from './bookSlice';


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { email } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (email) {
      dispatch(loadUserData({ userId: email }));
    } else {
      dispatch(clearUserData());
    }
  }, [email, dispatch]);

  return <>{children}</>;
};