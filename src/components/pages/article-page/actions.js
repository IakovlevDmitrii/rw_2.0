import { API } from "../../../api.config";
import { adeptArticle } from "../../../utils/adept-article";

export const REQUEST_ARTICLE = "REQUEST_ARTICLE";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const ARTICLE_CREATION_REQUEST = "ARTICLE_CREATION_REQUEST";
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
};

export const requestArticle = slug => (dispatch, getState) => {
    const {currentUser} = getState().authentication;
    const token = currentUser.token || "";
    const currentArticle = getState().articlePage.article;

    if(slug !== currentArticle.slug) {
        dispatch({type: REQUEST_ARTICLE});

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
    }
};

export const receiveArticle = article => {
    return {
        type: RECEIVE_ARTICLE,
        payload: {article},
    }
};

export const createAnArticle = content => (dispatch, getState) => {
    const {user} = getState().authentication;
    const {list} = getState().articlesPage;

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
};

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
};
