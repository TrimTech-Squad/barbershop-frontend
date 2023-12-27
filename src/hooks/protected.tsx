import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth";
import { useNavigate } from "react-router-dom";

const useAuth: React.FC<{
  role: "Admin" | "Customer";
}> = ({ role }) => {
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (userContext.user) {
      if (userContext.user?.role === role) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [navigate, role, userContext]);

  return isAuthorized;
};

export default useAuth;
