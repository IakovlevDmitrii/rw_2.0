import actionTypes from "../actions-types";

const {
  LOADING_AUTH,
  LOG_OUT,
  UPDATE_USER,
} = actionTypes.authentication;

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  user: {},
};

// eslint-disable-next-line default-param-last
const authentication = (state = initialState, action) => {
  switch (action.type) {

    case LOADING_AUTH:
      return {
        ...state,
        isFetching: action.payload.status,
      };

    case LOG_OUT:
      return initialState;

    case UPDATE_USER:
      return {
        isFetching: false,
        isLoggedIn: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default authentication;
