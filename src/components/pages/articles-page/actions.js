import API from '../../../api.config';
import { adeptArticles } from '../../../utils/adept-article';

export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";

export const receiveArticles = ({ articlesCount, list }) => ({
  type: RECEIVE_ARTICLES,
  payload: { articlesCount, list },
});

export const requestArticles = (limit, page) => (dispatch, getState) => {
  const {currentUser} = getState().common;
  const token = currentUser.token || "";

  return fetch(API.ARTICLES.SUMMARY(limit, page), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      const { articlesCount, articles } = result;
      const list = adeptArticles(articles);
      const articlesData = {
        articlesCount,
        list,
      };
      dispatch(receiveArticles(articlesData));

      return {
        isArticlesReceived: true
      };
    })
    .catch(err => {
      console.log(`[GET ARTICLES] error ${err.toLocaleString()}`);// eslint-disable-line
      return {
        hasError: true,
      };
    })
};

export const changePageNumber = pageNumber => dispatch => {
  dispatch({
    type: CHANGE_PAGE_NUMBER,
    payload: { pageNumber },
  });
};
