import { CHANGE_PAGE_NUMBER, RECEIVE_ARTICLES } from './actions';
import { RECEIVE_FAVORITE_CHANGE } from '../../article/actions';
import { CREATE_AN_ARTICLE } from '../new-article-page/actions';
import { RECEIVE_ARTICLE } from '../article-page/actions';

const initialState = {
  articlesCount: 0,
  currentPage: 1,
  list: [],
};

// eslint-disable-next-line default-param-last
const articlesReducer = (state = initialState, action)=> {
  const { payload, type } = action;

  switch (type){
    case RECEIVE_ARTICLES:
      return {
        ...state,
        articlesCount: payload.articlesCount,
        list: payload.list,
      };

    case RECEIVE_ARTICLE:
      // eslint-disable-next-line no-case-declarations
      const changingList = [...state.list];
      // eslint-disable-next-line no-case-declarations
      const changingArticle = changingList.find(item => item.slug === payload.article.slug)
      Object.assign(changingArticle, payload.article)

      return {
        ...state,
        list: changingList,
      };

    case CHANGE_PAGE_NUMBER:
      return {
        ...state,
        currentPage: payload.pageNumber,
      };

    case RECEIVE_FAVORITE_CHANGE:
      // eslint-disable-next-line no-case-declarations
      const list = [...state.list];
      // eslint-disable-next-line no-case-declarations
      const article = list.find(item => item.slug === payload.article.slug)
      Object.assign(article, payload.article)

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
