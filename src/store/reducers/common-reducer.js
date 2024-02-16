import { UPDATE_USER } from '../actions';
import { LOG_OUT } from '../../components/header/actions';
import { FETCHING_ARTICLE } from '../../components/pages/article-page/actions';

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isFetching: false,
};

// eslint-disable-next-line default-param-last
const commonReducer = (state = initialState, action) => {
  const {payload, type} = action;

  switch (type) {
    case FETCHING_ARTICLE:
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
        currentUser: payload.user,
        isLoggedIn: true,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default commonReducer;
