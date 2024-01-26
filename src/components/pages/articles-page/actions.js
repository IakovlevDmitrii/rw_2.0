import API from '../../../api.config';
import { adeptArticles } from '../../../utils/adept-article';

export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";

export const receiveArticles = ({ articlesCount, list }) => ({
  type: RECEIVE_ARTICLES,
  payload: { articlesCount, list },
});

export const requestArticles = (limit, page) => (dispatch, getState) => {
  const { currentUser } = getState().common;
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
      const { articlesCount, articles, errors } = result;

      if(errors) {
        console.log(`[GET ARTICLES] error ${errors.toLocaleString()}`);// eslint-disable-line
      } else {
        const list = adeptArticles(articles);

        dispatch(receiveArticles({
          articlesCount, list }));
      }

      return !!articles;
    })
    .catch(err => {
      console.log(`[GET ARTICLES] error ${err.toLocaleString()}`);// eslint-disable-line

      return false;
    })
};

export const changePageNumber = pageNumber => dispatch => {
  dispatch({
    type: CHANGE_PAGE_NUMBER,
    payload: { pageNumber },
  });
};
