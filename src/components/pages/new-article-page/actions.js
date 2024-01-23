import {API} from "../../../api.config";
import {adeptArticle} from "../../../utils/adept-article";
import {receiveArticle} from "../article-page/actions";

export const ARTICLE_CREATION_FETCHING = "ARTICLE_CREATION_FETCHING";
export const CREATE_AN_ARTICLE = "CREATE_AN_ARTICLE";

export const createAnArticle = content => (dispatch, getState) => {
    dispatch({
        type: ARTICLE_CREATION_FETCHING,
        payload: {status: true},
    });

    const currentUser = getState().authentication.currentUser;
    const articlesList = getState().homePage.articlesList;
    const token = currentUser.token || "";
    const data = {
        article: {...content},
    };
    const body = JSON.stringify(data);

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

                dispatch({
                    type: ARTICLE_CREATION_FETCHING,
                    payload: {status: false},
                })
            }

            return result
        })
        .catch(e => {
            console.log(`[CREAT ARTICLE] error ${e.toLocaleString()}`);
            dispatch({
                type: ARTICLE_CREATION_FETCHING,
                payload: {status: false},
            })
        })
};
