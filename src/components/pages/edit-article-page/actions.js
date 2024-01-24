import {API} from "../../../api.config";
import {FETCHING_ARTICLE, RECEIVE_ARTICLE} from "../article-page/actions";
import {adeptArticle} from "../../../utils/adept-article";

export const updateArticle = (slug, detailsToChange) => (dispatch, getState) => {
   const token = getState().common.currentUser.token;

    dispatch({
        type: FETCHING_ARTICLE,
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

            dispatch({
                type: FETCHING_ARTICLE,
                payload: {status: false},
            });

            return res;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
};
