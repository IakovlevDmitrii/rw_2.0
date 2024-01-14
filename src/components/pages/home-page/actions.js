import { API } from "../../../api.config";
import { adeptArticles } from "../../../utils/adept-article";
export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const REQUEST_ARTICLES = "REQUEST_ARTICLES";

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const { currentUser } = getState().authentication;
    const token = currentUser.token || "";

    dispatch({
        payload: {status: true},
        type: REQUEST_ARTICLES,
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
    })
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
    .finally( dispatch({
        payload: {status: false},
        type: REQUEST_ARTICLES,
    }))
};

export const receiveArticles = ({articlesCount, articlesList}) => {
    return {
        payload: {articlesCount, articlesList},
        type: RECEIVE_ARTICLES,
    }
};

export const changePageNumber = pageNumber => dispatch => {
    dispatch({
        payload: {pageNumber},
        type: CHANGE_PAGE_NUMBER,
    })
};
