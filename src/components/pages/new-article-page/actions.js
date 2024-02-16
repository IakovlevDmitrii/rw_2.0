import API from '../../../api.config';
import { adaptArticle } from '../../../utils/adapt-article';

export const CREATE_AN_ARTICLE = "CREATE_AN_ARTICLE";

export const createAnArticle = content => (dispatch, getState) => {
  const {currentUser} = getState().common;
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

      if (articleDetails) {
        const newArticle = adaptArticle(articleDetails);
        articlesList.push(newArticle);

        dispatch({
          type: CREATE_AN_ARTICLE,
          payload: { list: articlesList },
        });
      }

      return result
    })
    .catch(err => {
      console.log(`[CREAT ARTICLE] error ${err.toLocaleString()}`); // eslint-disable-line
    })
};
