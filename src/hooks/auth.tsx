import { ReactNode, useEffect, useMemo, useState } from "react";
import AuthContext, { USERAUTH } from "../context/auth";

const Auth = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERAUTH | null>(null);

  const userMemo = useMemo(() => {
    return user;
  }, [user]);

  const login = (data: USERAUTH) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  console.log(userMemo);

  return (
    <AuthContext.Provider value={{ user: userMemo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
