import {API} from "../../../api.config";
import {fetchingAuthentication, updateUser} from "../../../store/actions";

export const editProfile = detailsToChange => (dispatch, getState) => {
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
