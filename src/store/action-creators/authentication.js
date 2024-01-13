import { API } from "../../api.config";
import actionsTypes from "../actions-types";

const {
    FETCHING_AUTHENTICATION,
    LOG_OUT,
    UPDATE_USER,
} = actionsTypes.authentication;

const fetchingAuthentication = status => dispatch => {
    dispatch({
        payload: {status},
        type: FETCHING_AUTHENTICATION,
    });
};

const logIn = (email, password) => dispatch => {
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
        .then((res) => {
            const userDetails = res.user;
            const serverErrors = res.errors;

            if (userDetails) {
                dispatch(updateUser(userDetails));
            }

            if (serverErrors) {
                return serverErrors;
            }

        })
        .catch((err) => {
            throw new Error(err.message);
        })
        .finally(() => {
            dispatch(fetchingAuthentication(false));
        });
};

const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    });
};

const updateUser = user => dispatch => {
    dispatch({
        payload: {user},
        type: UPDATE_USER,
    })
};

const authentication = {
    fetchingAuthentication,
    logIn,
    logOut,
    updateUser,
};

export default authentication;
