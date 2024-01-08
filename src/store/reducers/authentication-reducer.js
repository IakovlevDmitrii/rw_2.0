import actionsTypes from "../actions-types";

const {
  REQUEST_AUTHENTICATION,
  LOG_OUT,
  UPDATE_USER,
} = actionsTypes.authentication;

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  currentUser: {},
};

// eslint-disable-next-line default-param-last
const authentication = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {

    case REQUEST_AUTHENTICATION:
      return {
        ...state,
        isFetching: payload.status,
      };

    case LOG_OUT:
      return initialState;

    case UPDATE_USER:
      return {
        isFetching: false,
        isLoggedIn: true,
        currentUser: payload.user,
      };

    default:
      return state;
  }
};

export default authentication;
