import {API} from "../../api.config";
import {getContent} from "../../services/utils";

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const SELECT_ARTICLE = "SELECT_ARTICLE";
export const FAVORITE_ARTICLE = "FAVORITE_ARTICLE";
// export const REMOVE_ARTICLE_FROM_SELECTED = "REMOVE_ARTICLE_FROM_SELECTED";

export const requestArticles = (limit, page) => (dispatch, getState) => {
    const { user } = getState().authentication;
    const token = user.token || "";

    dispatch({type: REQUEST_ARTICLES});

    return fetch( API.ARTICLES.SUMMARY(limit, page), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
    .then(response => response.json())
    .then(result => {
        const { articles, articlesCount } = result;

        const newArticles = articles.map(article => getContent(article));

        const payload = {
            articles: newArticles,
            articlesCount,
        };

        dispatch(receiveArticles(payload));
    })
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
}

export const receiveArticles = payload => {
    return {
        type: RECEIVE_ARTICLES,
        payload: payload,
        receivedAt: Date.now()
    }
}

export const selectArticle = slug => dispatch => {
    dispatch({type: SELECT_ARTICLE, payload: slug});
};

// export const removeArticleFromSelected = () => dispatch => {
//     dispatch({type: REMOVE_ARTICLE_FROM_SELECTED});
// };

export const favoriteArticle = (slug, favorited) => (dispatch, getState) => {
    const { user } = getState().authentication;
    const token = user.token || "";
    const articles = getState().articles.list;

    return fetch( API.ARTICLE.FAVORITE(slug), {
        method: favorited ? "DELETE" : "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
        .then(response => response.json())
        .then(result => {
            const index = articles.findIndex(article => article.slug === slug);
            const newArticle = result.article;

            const newArticles = [
                ...articles.slice(0, index),
                newArticle,
                ...articles.slice(index + 1),
            ];

            dispatch({
                type: FAVORITE_ARTICLE,
                payload: newArticles,
            })
        })
        .catch(e => console.log(`[FAVORITE ARTICLE] error ${e.toLocaleString()}`))
};