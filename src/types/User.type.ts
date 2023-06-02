interface User {
  user_name: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any;
}

interface PayloadData {
  payload: User;
}

type FormData = User;

export type { User, AuthState, PayloadData, FormData };
