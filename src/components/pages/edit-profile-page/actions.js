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
    .then(response => response.json())
    // eslint-disable-next-line consistent-return
    .then(res => {
      const userDetails = res.user;
      const serverErrors = res.errors;

      if(userDetails) {
        dispatch(updateUser(userDetails));
        return {isUserUpdated: true};
      }

      if(serverErrors) {
        return serverErrors;
      }
    })
    .catch(err => {
      console.log(`[EDIT PROFILE] error ${err.toLocaleString()}`); //eslint-disable-line
    })
};

export default editProfile;
