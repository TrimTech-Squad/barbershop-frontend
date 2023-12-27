import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

export type AuthContextType = {
  user: USERAUTH | null;
  login: (data: USERAUTH) => void;
  logout: () => void;
};

export type USERAUTH = {
  token: string;
  role: string;
  id?: number;
  name?: string;
  email?: string;
  photo_url?: string;
  number?: string;
};
