import {API} from "../../../api.config";
import {adeptArticle} from "../../../utils/adept-article";
import {receiveArticle} from "../article-page/actions";

export const FETCHING_ARTICLE_CREATION = "FETCHING_ARTICLE_CREATION";
export const CREATE_AN_ARTICLE = "CREATE_AN_ARTICLE";

export const createAnArticle = content => (dispatch, getState) => {
    dispatch({
        type: FETCHING_ARTICLE_CREATION,
        payload: {status: true},
    });

    const currentUser = getState().common.currentUser;
    const articlesList = getState().articles.list;
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
                    payload: {list: articlesList},
                });

                dispatch(receiveArticle(articleDetails));

                dispatch({
                    type: FETCHING_ARTICLE_CREATION,
                    payload: {status: false},
                })
            }

            return result
        })
        .catch(e => {
            console.log(`[CREAT ARTICLE] error ${e.toLocaleString()}`);
        })
};
