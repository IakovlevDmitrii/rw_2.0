import API from '../../../api.config';
import { adaptArticle } from '../../../utils/adapt-article';

export const FETCHING_ARTICLE = "FETCHING_ARTICLE";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const RECEIVE_AN_ARTICLE_NOT_FROM_THE_LIST = "RECEIVE_AN_ARTICLE_NOT_FROM_THE_LIST";

export const receiveAnArticleNotFromTheList = (article) => ({
  type: RECEIVE_AN_ARTICLE_NOT_FROM_THE_LIST,
  payload: { article },
})

export const requestArticle = (slug) => (dispatch, getState) => {
  const { currentUser } = getState().common;
  const token = currentUser.token || "";

  return fetch(API.ARTICLE.GET(slug), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      const adaptedArticle = adaptArticle(result.article);
      dispatch(receiveAnArticleNotFromTheList(adaptedArticle));

      return true;
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(`[REQUEST ARTICLE] error ${err.toLocaleString()}`);
      return false;
    })
};
