import {API} from "../../api.config";

// export const REQUEST_FAVORITE = "REQUEST_FAVORITE";
export const RECEIVE_FAVORITE_CHANGE = "FAVORITE_ARTICLE";

export const toggleFavorite = (slug, flag) => (dispatch, getState) => {
    const {user} = getState().authentication;
    const token = user.token || "";

//    dispatch(requestFavorite(content.slug));

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

// export const requestFavorite = slug => (dispatch, getState) => {
//     const favoriteFetching = getState().articles.favoriteFetching;
//     favoriteFetching.push(slug);
//
//     dispatch({
//         type: REQUEST_FAVORITE,
//         payload: {favoriteFetching},
//         receivedAt: Date.now()
//     });
// };