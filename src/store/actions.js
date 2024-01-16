export const FETCHING_AUTHENTICATION = "FETCHING_AUTHENTICATION"
export const UPDATE_USER = "UPDATE_USER";

export const fetchingAuthentication = status => dispatch => {
    dispatch({
        payload: {status},
        type: FETCHING_AUTHENTICATION,
    });
};

export const updateUser = user => dispatch => {
    dispatch({
        payload: {user},
        type: UPDATE_USER,
    });
};
