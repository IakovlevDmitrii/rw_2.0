import {API} from "../../../api.config";
import {fetchingAuthentication, updateUser} from "../../../store/actions";

export const signUp = (username, email, password) => dispatch => {
    dispatch(fetchingAuthentication(true));

    return fetch(API.AUTHENTICATION.SIGN_UP(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            user: {
                username,
                email,
                password,
            },
        }),
    })
        .then(response => response.json())
        .then(res => {
            if(res.user) {
                dispatch(updateUser(res.user));
            }
            dispatch(fetchingAuthentication(false));

            return res;
        })
        .catch(e => {
            console.log(`[SIGN UP] error ${e.toLocaleString()}`);
        })
};
