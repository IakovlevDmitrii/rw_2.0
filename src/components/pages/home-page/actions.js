import {API} from "../../../api.config";
import {adeptArticles} from "../../../utils/adept-article";
import {
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    CHANGE_PAGE_NUMBER,
} from "./actionTypes";

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
        const {articlesCount, articles} = result;

        const articlesData = {
            articlesCount,
            articlesList: adeptArticles(articles),
        };

        dispatch(receiveArticles(articlesData));
    })
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
};

export const receiveArticles = ({articlesCount, articlesList}) => {
    return {
        type: RECEIVE_ARTICLES,
        payload: {articlesCount, articlesList},
    }
};

export const changePageNumber = pageNumber => dispatch => {
    dispatch({
        type: CHANGE_PAGE_NUMBER,
        payload: {pageNumber}
    })
};
