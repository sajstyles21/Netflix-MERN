import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../requestMethods";
import { updateTokens } from "../redux/slices/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [tokenData, setTokenData] = useState({});

  const { refreshToken } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getTokens = async () => {
      try {
        const getRefreshToken = await axios.post(`${baseUrl}api/auth/refresh`, {
          token: refreshToken,
        });
        const { accessToken, refreshToken } = getRefreshToken.data;
        dispatch(updateTokens({ accessToken, refreshToken }));
        setTokenData(getRefreshToken.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTokens();
  }, [dispatch, refreshToken]);
  return tokenData;
};

export default useRefreshToken;
