import { API } from "../../api.config";

export const RECEIVE_FAVORITE_CHANGE = "RECEIVE_FAVORITE_CHANGE";

export const toggleFavorite = (slug, flag) => (dispatch, getState) => {
    const { currentUser } = getState().authentication;
    const token = currentUser.token || "";

    return fetch(API.ARTICLE.FAVORITE(slug), {
        method: flag ? "POST" : "DELETE",
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
