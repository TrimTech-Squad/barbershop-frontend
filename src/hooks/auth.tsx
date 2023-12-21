import { ReactNode, useState } from "react";
import AuthContext, { USERAUTH } from "../context/auth";

const Auth = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERAUTH | null>(null);

  const login = (data: USERAUTH) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
