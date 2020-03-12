import axios from "axios";
import { BaseUrl } from "../config/API";
// headerAutorization

export const type = () => {
  return {
    type: "GET_TYPE",
    payload: axios({
      method: "GET",
      url: `${BaseUrl}/type`
    })
  };
};
