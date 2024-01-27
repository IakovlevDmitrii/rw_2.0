import API from "../../../api.config";
import { fetchingAuthentication, updateUser } from "../../../store/actions";

const signIn = (email, password) => dispatch => {
  dispatch(fetchingAuthentication(true));

  return fetch(API.AUTHENTICATION.LOGIN(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  })
    .then(response => response.json())
    .then(res => {
      if(res.user) {
        dispatch(updateUser(res.user));
      }
      dispatch(fetchingAuthentication(false));

      return res;
    })
    .catch(err => {
      console.log(`[SIGN IN] error ${err.toLocaleString()}`); // eslint-disable-line
      dispatch(fetchingAuthentication(false));
    })
};

export default signIn;
