import axios from "axios";
import jwt_decode from "jwt-decode";

//const BASE_URL = "https://netflix-backend-22.herokuapp.com/";
const BASE_URL = "http://localhost:8800/";

let user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const baseUrl = BASE_URL;

export const isTokenExpired = (token) => {
  let currentDate = new Date();
  const decodedToken = jwt_decode(token);
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  }
  return false;
};
