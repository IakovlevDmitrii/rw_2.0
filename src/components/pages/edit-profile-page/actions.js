import API from '../../../api.config';
import { fetchingAuthentication, updateUser } from '../../../store/actions';

const editProfile = detailsToChange => (dispatch, getState) => {
  const { token } = getState().common.currentUser;

  dispatch(fetchingAuthentication(true));

  return fetch(API.AUTHENTICATION.EDIT(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: {
        ...detailsToChange,
      },
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if(res.user) {
        dispatch(updateUser(res.user));
      }
      dispatch(fetchingAuthentication(false));

      return res;
    })
    .catch(err => {
      console.log(`[EDIT PROFILE] error ${err.toLocaleString()}`); //eslint-disable-line
      dispatch(fetchingAuthentication(false));
    })
};

export default editProfile;
