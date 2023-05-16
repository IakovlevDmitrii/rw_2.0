import {API} from "../../api.config";
import {adeptArticle, adeptArticles} from "../../utils/adept-article";

export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SELECT_ARTICLE = "SELECT_ARTICLE";
export const ARTICLE_CREATION_REQUEST = "ARTICLE_CREATION_REQUEST";
export const CREATE_AN_ARTICLE = "CREATE_AN_ARTICLE";
export const REQUEST_TO_REMOVE_ARTICLE = "REQUEST_TO_REMOVE_ARTICLE";

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
        const payload = {
            list: adeptArticles(result.articles),
            articlesCount: result.articlesCount,
        };
        dispatch(receiveArticles(payload));
    })
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
};

export const receiveArticles = payload => {
    return {
        type: RECEIVE_ARTICLES,
        payload: payload,
        receivedAt: Date.now()
    }
};

export const changePage = page => dispatch => {
    dispatch({type: CHANGE_PAGE, payload: {page}})
};

export const selectArticle = slug => dispatch => {
    dispatch({type: SELECT_ARTICLE, payload: {slug}});
};

export const createAnArticle = content => (dispatch, getState) => {
    const {user} = getState().authentication;
    const {list} = getState().articles;

    const token = user.token || "";
    const data = {
        article: {...content}
    };
    const body = JSON.stringify(data);

    dispatch({
        type: ARTICLE_CREATION_REQUEST,
        payload: {status: true}
    });

    return fetch(API.ARTICLE.CREATE(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
        body,
    })
        .then(response => response.json())
        .then(result => {
            const articleDetails = result.article;
            // const serverErrors = result.errors;

            if(articleDetails) {
                const newArticle = adeptArticle(articleDetails);
                list.push(newArticle);

                dispatch({
                    type: CREATE_AN_ARTICLE,
                    payload: {list}});

                dispatch(selectArticle(articleDetails.slug));
            }

            dispatch({
                type: ARTICLE_CREATION_REQUEST,
                payload: {status: false}
            });

            return result
        })
}

export const deleteArticle = slug => (dispatch, getState) => {
    const {user} = getState().authentication;
    const token = user.token || "";

    dispatch({
        type: REQUEST_TO_REMOVE_ARTICLE,
        payload: {status: true}
    });

    return fetch(API.ARTICLE.DELETE(slug), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
    })
        .then(response => {!!response.ok})
        .finally(dispatch({
            type: REQUEST_TO_REMOVE_ARTICLE,
            payload: {status: false}
        }));
}