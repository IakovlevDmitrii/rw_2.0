import {API} from "../../api.config";
import {RECEIVE_ARTICLE} from "../pages/article-page/actions";
import {adeptArticle} from "../../utils/adept-article";

export const RECEIVE_FAVORITE_CHANGE = "RECEIVE_FAVORITE_CHANGE";
export const REQUEST_TO_REMOVE_ARTICLE = "REQUEST_TO_REMOVE_ARTICLE";

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
            dispatch({
                type: RECEIVE_FAVORITE_CHANGE,
                payload: {article: adeptArticle(result.article)}
            })

            return true;
        })
        .catch(e => console.log(`[FAVORITE ARTICLE] error ${e.toLocaleString()}`))
};

export const deleteArticle = slug => (dispatch, getState) => {
    const currentUser = getState().authentication.currentUser;
    const token = currentUser.token || "";

    dispatch({
        type: REQUEST_TO_REMOVE_ARTICLE,
        payload: {status: true},
    });

    return fetch(API.ARTICLE.DELETE(slug), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
        .then(() => {
            dispatch({
                type: RECEIVE_ARTICLE,
                payload: {article: {}},
            })

            return true;
        })
        .catch(e => console.log(`[DELETE ARTICLE] error ${e.toLocaleString()}`))
        .finally(() => {
            dispatch({
                type: REQUEST_TO_REMOVE_ARTICLE,
                payload: {status: false},
            })
        });
};
