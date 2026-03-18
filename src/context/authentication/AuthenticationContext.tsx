import type { User } from "firebase/auth";
import { createContext } from "react";

type AuthenticationContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: false,
});
