const initialState = {
  dataType: [],
  isLoading: false,
  error: false
};

export const type = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TYPE_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_TYPE_FULFILLED":
      return {
        ...state,
        dataType: action.payload.data.data,
        isLoading: false
      };
    case "GET_TYPE_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
