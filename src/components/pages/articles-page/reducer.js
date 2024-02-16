import { CHANGE_PAGE_NUMBER, RECEIVE_ARTICLES } from './actions';
import { RECEIVE_FAVORITE_CHANGE } from '../../article/actions';
import { CREATE_AN_ARTICLE } from '../new-article-page/actions';
import { RECEIVE_ARTICLE, RECEIVE_AN_ARTICLE_NOT_FROM_THE_LIST } from '../article-page/actions';

const initialState = {
  articlesCount: 0,
  currentPage: 1,
  list: [],
};

// eslint-disable-next-line default-param-last
const articlesReducer = (state = initialState, action)=> {
  const {payload, type} = action;
  const list = [...state.list];

  switch (type){
    case RECEIVE_ARTICLES:
      return {
        ...state,
        articlesCount: payload.articlesCount,
        list: payload.list,
      };

    case CHANGE_PAGE_NUMBER:
      return {
        ...state,
        currentPage: payload.pageNumber,
      };

    case RECEIVE_ARTICLE:
    case RECEIVE_FAVORITE_CHANGE: {
      const changingArticle = list.find(item => item.slug === payload.article.slug)
      Object.assign(changingArticle, payload.article)

      return {
        ...state,
        list,
      };
    }

    case RECEIVE_AN_ARTICLE_NOT_FROM_THE_LIST:
      list.push(payload.article);

      return {
        ...state,
        list,
      };

    case CREATE_AN_ARTICLE:
      return {
        ...state,
        list: payload.list,
      };

    default:
      return state;
  }
};

export default articlesReducer;
