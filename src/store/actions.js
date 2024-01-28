export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: { user },
  });
};
