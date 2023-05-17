import {API} from "../../api.config";
import {adeptArticles} from "../../utils/adept-article";

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const {user} = getState().authentication;
    const token = user.token || "";

    dispatch({type: REQUEST_ARTICLES});

    return fetch(API.ARTICLES.SUMMARY(limit, page), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
    .then(response => response.json())
    .then(result => {
        const articlesData = {
            articlesCount: result.articlesCount,
            list: adeptArticles(result.articles),
        };

        dispatch(receiveArticles(articlesData));
    })
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
};

export const receiveArticles = ({articlesCount, list}) => {
    return {
        type: RECEIVE_ARTICLES,
        payload: {articlesCount, list},
    }
};

export const changePage = page => dispatch => {
    dispatch({
        type: CHANGE_PAGE,
        payload: {page}
    })
};
