import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAccessToken = () => {
  const [token, setToken] = useState(null);
  const { accessToken } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setToken(accessToken);
  }, [token]);

  return token;
};

export default useAccessToken;
