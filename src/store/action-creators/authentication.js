import actionsTypes from "../actions-types";

const {
    LOG_OUT,
    REQUEST_AUTHENTICATION,
    UPDATE_USER,
} = actionsTypes.authentication;

const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    });
};

const requestAuthentication = status => dispatch => {
    dispatch({
        payload: {status},
        type: REQUEST_AUTHENTICATION,
    });
};

const updateUser = user => dispatch => {
    dispatch({
        payload: {user},
        type: UPDATE_USER,
    })
};

const authentication = {
    logOut,
    requestAuthentication,
    updateUser,
};

export default authentication;
