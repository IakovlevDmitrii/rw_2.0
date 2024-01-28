import { FETCHING_AUTHENTICATION, UPDATE_USER } from '../actions';
import { LOG_OUT } from '../../components/header/actions';
import { FETCHING_ARTICLE } from '../../components/pages/article-page/actions';
import { FETCHING_ARTICLE_CREATION } from '../../components/pages/new-article-page/actions';
import { REQUEST_TO_REMOVE_ARTICLE } from '../../components/article/actions';

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isFetching: false,
  isFetchingAuthentication: false,
};

// eslint-disable-next-line default-param-last
const commonReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case FETCHING_ARTICLE:
      return {
        ...state,
        isFetching: payload.status,
      };

    case FETCHING_AUTHENTICATION:
      return {
        ...state,
        isFetchingAuthentication: payload.status,
      };

    case FETCHING_ARTICLE_CREATION:
      return {
        ...state,
        isFetching: payload.status,
      };

    case REQUEST_TO_REMOVE_ARTICLE:
      return {
        ...state,
        isFetching: payload.status,
      };

    case LOG_OUT:
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false,
      }

    case UPDATE_USER:
      return {
        ...state,
        currentUser: payload.user,
        isFetching: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default commonReducer;
