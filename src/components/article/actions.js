import {API} from "../../api.config";

export const RECEIVE_FAVORITE_CHANGE = "FAVORITE_ARTICLE";

export const toggleFavorite = (slug, flag) => (dispatch, getState) => {
    const {user} = getState().authentication;
    const token = user.token || "";

    return fetch(API.ARTICLE.FAVORITE(slug), {
        method: flag ? "POST": "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
        .then(response => response.json())
        .then(result => {
            dispatch({
                type: RECEIVE_FAVORITE_CHANGE,
                payload: result
            })
        })
        .catch(e => console.log(`[FAVORITE ARTICLE] error ${e.toLocaleString()}`))
};
