const initialState = {
  dataUser: [],
  isLoading: false,
  error: false
};

export const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CEK_USER_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_CEK_USER_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataUser: action.payload.data.data,
        isLoading: false
      };
    case "GET_CEK_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

export const sigIn = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "SIGN_IN_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataUser: action.payload.data,
        isLoading: false
      };
    case "SIGN_IN_REJECTED":
      console.log("Rejected ", action.payload.response.data);

      return {
        ...state,
        isLoading: false,
        error: true,
        dataUser: action.payload.response.data
      };
    default:
      return state;
  }
};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "REGISTER_FULFILLED":
      // console.log("Log POST_LOGIN_FULFILLED", action.payload.data);
      return {
        ...state,
        dataUser: action.payload.data,
        isLoading: false
      };
    case "REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
