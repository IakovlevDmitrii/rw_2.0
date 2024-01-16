import {API} from "../../api.config";
import actionsTypes from "../actions-types";

const {
    FETCHING_AUTHENTICATION,
    UPDATE_USER,
} = actionsTypes.authentication;

const fetchingAuthentication = status => dispatch => {
    dispatch({
        payload: {status},
        type: FETCHING_AUTHENTICATION,
    });
};

const editProfile = detailsToChange => (dispatch, getState) => {
    const token = getState().authentication.currentUser.token;

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
        .then((res) => {
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
        .catch((err) => {
            throw new Error(err.message);
        })
        .finally(() => {
            dispatch(fetchingAuthentication(false));
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
    editProfile,
    updateUser,
};

export default authentication;
