import { API } from "../../../api.config";
import { adeptArticles } from "../../../utils/adept-article";
export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const FETCHING_ARTICLES = "FETCHING_ARTICLES";

const fetchingArticles = status => dispatch => {
    dispatch({
        payload: {status},
        type: FETCHING_ARTICLES,
    });
};

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const { currentUser } = getState().authentication;
    const token = currentUser.token || "";

    dispatch(fetchingArticles(true));

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
    .finally(
        dispatch(fetchingArticles(false))
    )
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
