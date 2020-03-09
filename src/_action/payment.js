import axios from "axios";
import { BaseUrl, headerAutorization } from "../config/API";
// headerAutorization

export const getPaymnent = () => {
  return {
    type: "GET_PAYMENT",
    payload: axios({
      url: `${BaseUrl}/payment`,
      headers: headerAutorization
    })
  };
};
