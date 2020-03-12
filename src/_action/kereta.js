import axios from "axios";
import { BaseUrl, headerAutorization } from "../config/API";
// headerAutorization

export const getAlltiket = date => {
  return {
    type: "GET_TIKET",
    payload: axios({
      url: `${BaseUrl}/ticketAll?param1=${date}`
    })
  };
};

export const insertTiket = data => {
  return {
    type: "POST_TIKET",
    payload: axios({
      url: `${BaseUrl}/addTiket`,
      headers: headerAutorization,
      data
    })
  };
};
