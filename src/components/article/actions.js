import { API } from "../../api.config";

export const RECEIVE_FAVORITE_CHANGE = "RECEIVE_FAVORITE_CHANGE";

export const toggleFavorite = (slug, favorited) => (dispatch, getState) => {
    const currentUser = getState().authentication.currentUser;
    const token = currentUser.token || "";

    return fetch(API.ARTICLE.FAVORITE(slug), {
        method: favorited ? "DELETE" : "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
        .then(response => response.json())
        .then(result => {

            // TODO: add adeptArticle function
            dispatch({
                type: RECEIVE_FAVORITE_CHANGE,
                payload: result
            })

            return {isFavoriteChanged: true};
        })
        .catch(e => console.log(`[FAVORITE ARTICLE] error ${e.toLocaleString()}`))
};
