import API from '../../../api.config';
import { RECEIVE_ARTICLE } from '../article-page/actions';
import { adaptArticle } from '../../../utils/adapt-article';

const updateArticle = (slug, detailsToChange) => (dispatch, getState) => {
  const { token } = getState().common.currentUser;

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
      const article = adaptArticle(res.article);

      if(article) {
        dispatch({
          type: RECEIVE_ARTICLE,
          payload: {article},
        });
      }

      return res;
    })
    .catch(err => {
      throw new Error(err.message);
    })
};

export default updateArticle;
