import {API} from "../../../api.config";
import {ARTICLE_FETCHING, RECEIVE_ARTICLE} from "../article-page/actions";
import {adeptArticle} from "../../../utils/adept-article";

export const updateArticle = (slug, detailsToChange) => (dispatch, getState) => {
   const {token} = getState().authentication.currentUser;

    dispatch({
        type: ARTICLE_FETCHING,
        payload: {status: true},
    });

    return fetch(API.ARTICLE.UPDATE(slug), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            article: {...detailsToChange},
        }),
    })
        .then(response => response.json())
        .then(res => {
            const article = adeptArticle(res.article);

            if(article) {
                dispatch({
                    type: RECEIVE_ARTICLE,
                    payload: {article},
                });
            }

            return res;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
        .finally(() => {
            dispatch({
                type: ARTICLE_FETCHING,
                payload: {status: false},
            });
        });
};
