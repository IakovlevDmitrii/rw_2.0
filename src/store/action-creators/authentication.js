import actionTypes from "../actions-types";

const {
  LOADING_AUTH,
  UPDATE_USER,
  LOG_OUT,
} = actionTypes.authentication;

const loadingAuth = (status) => ({
  type: LOADING_AUTH,
  payload: { status },
})

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: { user },
});

const logOut = () => ({
  type: LOG_OUT,
});

const authentication = {
  loadingAuth,
  updateUser,
  logOut,
};

export default authentication;
