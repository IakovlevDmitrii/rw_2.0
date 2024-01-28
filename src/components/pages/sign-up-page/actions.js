import API from "../../../api.config";
import { updateUser } from "../../../store/actions";

const signUp = (username, email, password) => (dispatch) => (
  fetch(API.AUTHENTICATION.SIGN_UP(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      user: {
        username,
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

      return res;
    })
    .catch(err => {
      console.log(`[SIGN UP] error ${err.toLocaleString()}`); // eslint-disable-line
    })
)

export default signUp;
