import { API } from "../../../api.config";
import { adeptArticles } from "../../../utils/adept-article";
export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const {user} = getState().authentication;
    const token = user.token || "";

    dispatch({
        type: REQUEST_ARTICLES,
        payload: {status: true},
    });

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

        dispatch({
            type: REQUEST_ARTICLES,
            payload: {status: false},
        });
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
