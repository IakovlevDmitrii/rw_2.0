import API from "../../api.config";
import { adeptArticle } from "../../utils/adept-article";

export const RECEIVE_FAVORITE_CHANGE = "RECEIVE_FAVORITE_CHANGE";
export const REQUEST_TO_REMOVE_ARTICLE = "REQUEST_TO_REMOVE_ARTICLE";

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
        payload: {article: adeptArticle(result.article)}
      })

      return true;
    })
    .catch(eee => console.log(`[FAVORITE ARTICLE] error ${eee.toLocaleString()}`)) // eslint-disable-line
};

export const deleteArticle = slug => (dispatch, getState) => {
  const {currentUser} = getState().common;
  const token = currentUser.token || "";

  dispatch({
    type: REQUEST_TO_REMOVE_ARTICLE,
    payload: {status: true},
  });

  return fetch(API.ARTICLE.DELETE(slug), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  })
    .then(() => {
      dispatch({
        type: REQUEST_TO_REMOVE_ARTICLE,
        payload: {status: false},
      });

      return true;
    })
    .catch(err => {
      console.log(`[DELETE ARTICLE] error ${err.toLocaleString()}`); // eslint-disable-line
    })
};
