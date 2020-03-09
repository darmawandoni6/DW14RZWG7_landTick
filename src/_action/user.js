import axios from "axios";
import { BaseUrl, headerAutorization } from "../config/API";
// headerAutorization

export const cekUser = () => {
  return {
    type: "GET_CEK_USER",
    payload: axios({
      method: "GET",
      url: `${BaseUrl}/cekuser`,
      headers: headerAutorization
    })
  };
};

export const signIn = user => {
  return {
    type: "SIGN_IN",
    payload: axios({
      method: "POST",
      url: `${BaseUrl}/auth`,
      // headers: headerAutorization,
      data: user
    })
  };
};
export const register = user => {
  return {
    type: "REGISTER",
    payload: axios({
      method: "POST",
      url: `${BaseUrl}/register`,
      // headers: headerAutorization,
      data: user
    })
  };
};
