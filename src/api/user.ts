import { instance } from '../utils/httpClient';

export interface User {
  user_name: string;
  password: string;
}

export const fetchUser = async (): Promise<User> => {
  const { data } = await instance.get('/user');
  return data;
};
