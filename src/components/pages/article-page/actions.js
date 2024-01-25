import API from '../../../api.config';
import { adeptArticle } from '../../../utils/adept-article';

export const FETCHING_ARTICLE = "FETCHING_ARTICLE";
export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";

export const getArticle = slug => (dispatch, getState) => {
  const { list } = getState().articles;
  const article = list.find(item => item.slug === slug);

  if(!article) {
    const {currentUser} = getState().common;
    const token = currentUser.token || "";
    dispatch({
      type: FETCHING_ARTICLE,
      payload: {status: true},
    });

    return fetch(API.ARTICLE.GET(slug), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch({
          type: FETCHING_ARTICLE,
          payload: {status: false},
        });

        return adeptArticle(result.article);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(`[GET ARTICLE] error ${err.toLocaleString()}`))
  }

  return article;
};

// export const getArticle = slug => (dispatch, getState) => {
//     const articlesList = getState().articles.list;
//     const article = articlesList.find(item => item.slug === slug);
//
//     if(article) {
//         dispatch(receiveArticle(article));
//     } else {
//         dispatch(requestArticle(slug));
//     }
//
//     dispatch({
//         type: ARTICLE_FETCHING,
//         payload: {status: false},
//     })
// };

// export const requestArticle = slug => (dispatch, getState) => {
//     const currentUser = getState().common.currentUser;
//     const token = currentUser.token || "";
//     const articlesList = getState().articles.list;
//     const currentArticle = articlesList.find(item => item.slug === slug);
//
//     if(slug !== currentArticle.slug) {
//         dispatch({
//             type: ARTICLE_FETCHING,
//             payload: {status: true},
//         });
//
//         return fetch(API.ARTICLE.GET(slug), {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json;charset=utf-8",
//                 Authorization: `Token ${token}`,
//             },
//         })
//             .then(response => response.json())
//             .then(result => {
//                 const article = adeptArticle(result.article);
//
//                 dispatch(receiveArticle(article));
//             })
//             .catch(e => console.log(`[GET ARTICLE] error ${e.toLocaleString()}`))
//             .finally(() => {
//                 dispatch({
//                     type: ARTICLE_FETCHING,
//                     payload: {status: false},
//                 })
//             });
//     }
// };

export const receiveArticle = article => ({
  type: RECEIVE_ARTICLE,
  payload: {article},
});
