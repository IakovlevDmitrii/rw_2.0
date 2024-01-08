import actionsTypes from "../actions-types";

const {
  LOG_OUT,
  REQUEST_AUTHENTICATION,
  UPDATE_USER,
} = actionsTypes.authentication;

const initialState = {
  currentUser: {},
  isFetching: false,
  isLoggedIn: false,
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
        currentUser: payload.user,
        isFetching: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default authentication;
