import { ReactNode, useEffect, useMemo, useState } from "react";
import AuthContext, { USERAUTH } from "../context/auth";
import fetchApi from "../helper/fetch";

const Auth = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERAUTH | null>(null);

  const userMemo = useMemo(() => {
    return user;
  }, [user]);

  const login = async (data: USERAUTH) => {
    try {
      const res = await fetchApi("/user", "GET");

      const fetchedUser = { ...data, ...res.data };
      localStorage.setItem("user", JSON.stringify(fetchedUser));

      setUser(fetchedUser);
    } catch (err) {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return;

    (async () => {
      try {
        const res = await fetchApi("/user", "GET");
        const fetchedUser = { ...JSON.parse(userStorage), ...res.data };
        setUser(fetchedUser);
      } catch (err) {
        alert("Login failed");
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user: userMemo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
