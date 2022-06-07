import { userRequest } from "./requestMethods";
import jwt_decode from "jwt-decode";
import { logout } from "./redux/slices/userSlice";

const setup = (store) => {
  const { dispatch } = store;
  userRequest.interceptors.request.use(
    async (config) => {
      let user = JSON.parse(localStorage.getItem("user"));
      const aToken = user?.accessToken;
      let currentDate = new Date();
      const decodedToken = jwt_decode(aToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.clear();
        dispatch(logout({}));
        /*const rToken = user?.refreshToken;
        const newTokens = await publicRequest.post(
          `${baseUrl}api/auth/refresh`,
          {
            token: rToken,
          }
        );
        dispatch(updateTokens(newTokens.data));
        const { accessToken, refreshToken } = newTokens.data;
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
        config.headers["token"] = "Bearer " + accessToken;*/
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  userRequest.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 403) {
          localStorage.clear();
          dispatch(logout({}));
          /*try {
            let user = JSON.parse(localStorage.getItem("user"));
            const rToken = user?.refreshToken;
            const rs = await publicRequest.post(`${baseUrl}api/auth/refresh`, {
              token: rToken,
            });
            dispatch(updateTokens(rs.data));
            const { accessToken, refreshToken } = rs.data;
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            localStorage.setItem("user", JSON.stringify(user));
          } catch (_error) {
            return Promise.reject(_error);
          }*/
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
