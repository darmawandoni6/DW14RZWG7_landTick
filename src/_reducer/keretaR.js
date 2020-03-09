const initialState = {
  dataKereta: [],
  isLoading: false,
  error: false
};

const keretaR = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TIKET_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_TIKET_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataKereta: action.payload.data.data,
        isLoading: false
      };
    case "GET_TIKET_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
export default keretaR;
