import API from '../../api.config';
import { adaptArticle } from '../../utils/adapt-article';

export const RECEIVE_FAVORITE_CHANGE = "RECEIVE_FAVORITE_CHANGE";

export const toggleFavorite = (slug, favorited) => (dispatch, getState) => {
  const { currentUser } = getState().common;
  const token = currentUser.token || "";

  return fetch(API.ARTICLE.FAVORITE(slug), {
    method: favorited ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      dispatch({
        type: RECEIVE_FAVORITE_CHANGE,
        payload: {article: adaptArticle(result.article)}
      })

      return true;
    })
    .catch(eee => console.log(`[FAVORITE ARTICLE] error ${eee.toLocaleString()}`)) // eslint-disable-line
};

export const deleteArticle = (slug) => (dispatch, getState) => {
  const {currentUser} = getState().common;
  const token = currentUser.token || "";

  return fetch(API.ARTICLE.DELETE(slug), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  })
    .then(() => true)
    .catch(err => {
      console.log(`[DELETE ARTICLE] error ${err.toLocaleString()}`); // eslint-disable-line
      return false;
    })
};
