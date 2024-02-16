import API from '../../../api.config';
import { updateUser } from '../../../store/actions';

const editProfile = detailsToChange => (dispatch, getState) => {
  const {token} = getState().common.currentUser;

  return fetch(API.AUTHENTICATION.EDIT(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {...detailsToChange},
    }),
  })
    .then(response => response.json())
    .then(res => {
      if (res.user) {
        dispatch(updateUser(res.user));
      }
      return res;
    })
    .catch(err => {
      console.log(`[EDIT PROFILE] error ${err.toLocaleString()}`); //eslint-disable-line
    })
};

export default editProfile;
