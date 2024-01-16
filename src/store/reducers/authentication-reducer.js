import actionsTypes from "../actions-types";
import {LOG_OUT} from "../../components/header/actions";

const {
  FETCHING_AUTHENTICATION,
  UPDATE_USER,
} = actionsTypes.authentication;

const initialState = {
  currentUser: {},
  isFetching: false,
  isLoggedIn: false,
};

// eslint-disable-next-line default-param-last
const authentication = (state = initialState, action) => {
  const {payload, type} = action;

  switch (type) {

    case FETCHING_AUTHENTICATION:
      return {
        ...state,
        isFetching: payload.status,
      };

    case LOG_OUT:
      return initialState;

    case UPDATE_USER:
      return {
        ...state,
        currentUser: payload.user,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default authentication;
