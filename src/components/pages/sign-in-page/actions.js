import {API} from "../../../api.config";
import {fetchingAuthentication, updateUser} from "../../../store/actions";

export const signIn = (email, password) => dispatch => {
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
        .then(res => {
            const userDetails = res.user;
            const serverErrors = res.errors;

            if(userDetails) {
                dispatch(updateUser(userDetails));
                dispatch(fetchingAuthentication(false))
            }
            if(serverErrors) {
                dispatch(fetchingAuthentication(false))
                return serverErrors;
            }
        })
        .catch(e => {
            console.log(`[SIGN IN] error ${e.toLocaleString()}`);
            dispatch(fetchingAuthentication(false))
        })
};
