import axios from "axios";
import { BaseUrl, headerAutorization } from "../config/API";
// headerAutorization

export const getAllorder = () => {
  return {
    type: "GET_ORDER",
    payload: axios({
      url: `${BaseUrl}/list`,
      headers: headerAutorization
    })
  };
};

export const getDetailorder = id => {
  return {
    type: "GET_ORDER_DETAIL",
    payload: axios({
      url: `${BaseUrl}/list/${id}`,
      headers: headerAutorization
    })
  };
};
