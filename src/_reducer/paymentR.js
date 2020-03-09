const initialState = {
  dataPayment: [],
  isLoading: false,
  error: false
};

export const getPayment = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAYMENT_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_PAYMENT_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataPayment: action.payload.data.data,
        isLoading: false
      };
    case "GET_PAYMENT_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
