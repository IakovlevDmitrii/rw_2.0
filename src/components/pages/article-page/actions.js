import { API } from "../../../api.config";
import { adeptArticle } from "../../../utils/adept-article";

export const ARTICLE_FETCHING = "ARTICLE_FETCHING";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const ARTICLE_CREATION_FETCHING = "ARTICLE_CREATION_FETCHING";
export const CREATE_AN_ARTICLE = "CREATE_AN_ARTICLE";
export const REQUEST_TO_REMOVE_ARTICLE = "REQUEST_TO_REMOVE_ARTICLE";

export const getArticle = slug => (dispatch, getState) => {
    const currentArticle = getState().articlePage.article;

    if(slug !== currentArticle.slug) {
        const articlesList = getState().homePage.articlesList;
        const article = articlesList.find(item => item.slug === slug);

        if(article) {
            dispatch(receiveArticle(article));
        } else {
            dispatch(requestArticle(slug));
        }
    }

    dispatch({
        type: ARTICLE_FETCHING,
        payload: {status: false},
    })
};

export const requestArticle = slug => (dispatch, getState) => {
    const {currentUser} = getState().authentication;
    const token = currentUser.token || "";
    const currentArticle = getState().articlePage.article;

    if(slug !== currentArticle.slug) {
        dispatch({
            type: ARTICLE_FETCHING,
            payload: {status: true},
        });

        return fetch(API.ARTICLE.GET(slug), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Token ${token}`,
            },
        })
            .then(response => response.json())
            .then(result => {
                const article = adeptArticle(result.article);

                dispatch(receiveArticle(article));
            })
            .catch(e => console.log(`[GET ARTICLE] error ${e.toLocaleString()}`))
            .finally(
                dispatch({
                    type: ARTICLE_FETCHING,
                    payload: {status: false},
                })
            )
    }
};

export const receiveArticle = article => {
    return {
        type: RECEIVE_ARTICLE,
        payload: {article},
    }
};

export const createAnArticle = content => (dispatch, getState) => {
    const currentUser = getState().authentication.currentUser;
    const articlesList = getState().homePage.articlesList;

    const token = currentUser.token || "";
    const data = {
        article: {...content},
    };
    const body = JSON.stringify(data);

    dispatch({
        type: ARTICLE_CREATION_FETCHING,
        payload: {status: true},
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

            if(articleDetails) {
                const newArticle = adeptArticle(articleDetails);
                articlesList.push(newArticle);

                dispatch({
                    type: CREATE_AN_ARTICLE,
                    payload: {articlesList},
                });

                dispatch(receiveArticle(articleDetails));
            }

            return result
        })
        .catch(e => console.log(`[CREAT ARTICLE] error ${e.toLocaleString()}`))
        .finally(
            dispatch({
                type: ARTICLE_CREATION_FETCHING,
                payload: {status: false},
            })
        )
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
        .then(response => {!!response.ok})
        .finally(dispatch({
            type: REQUEST_TO_REMOVE_ARTICLE,
            payload: {status: false},
        }));
};
