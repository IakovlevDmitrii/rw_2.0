import {API} from "../../../api.config";
import {adeptArticles} from "../../../utils/adept-article";

export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
export const FETCHING_ARTICLES = "FETCHING_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";

const fetchingArticles = status => dispatch => {
    dispatch({
        type: FETCHING_ARTICLES,
        payload: { status },
    });
};

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const currentUser = getState().common.currentUser;
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
            const { articlesCount, articles } = result;
            const list = adeptArticles(articles);
            const articlesData = {
                articlesCount,
                list,
            };
            dispatch(receiveArticles(articlesData));
            dispatch(fetchingArticles(false));
        })
        .catch(e => {
            console.log(`[GET ARTICLES] error ${e.toLocaleString()}`);
            return {
                hasError: true,
            };
        })
};

export const receiveArticles = ({ articlesCount, list }) => {
    return {
        type: RECEIVE_ARTICLES,
        payload: { articlesCount, list },
    };
};

export const changePageNumber = pageNumber => dispatch => {
    dispatch({
        type: CHANGE_PAGE_NUMBER,
        payload: { pageNumber },
    });
};
