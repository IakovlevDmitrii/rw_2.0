export const FETCHING_AUTHENTICATION = "FETCHING_AUTHENTICATION"
export const UPDATE_USER = "UPDATE_USER";

export const fetchingAuthentication = status => dispatch => {
    dispatch({
        type: FETCHING_AUTHENTICATION,
        payload: {status},
    });
};

export const updateUser = user => dispatch => {
    dispatch({
        type: UPDATE_USER,
        payload: {user},
    });
};
