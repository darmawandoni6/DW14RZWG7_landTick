const initialState = {
  dataOrder: [],
  // dataOrderD: [],
  isLoading: false,
  error: false
};

export const listOrder = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_ORDER_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataOrder: action.payload.data.data,
        isLoading: false
      };
    case "GET_ORDER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

export const detailOrder = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_DETAIL_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_ORDER_DETAIL_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataOrder: action.payload.data.data,
        isLoading: false
      };
    case "GET_ORDER_DETAIL_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
