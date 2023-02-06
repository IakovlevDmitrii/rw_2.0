import actionTypes from "../actions-types";

const {
  LOADING_ARTICLES,
  SET_ARTICLES,
  SET_PAGE_NUMBER,
} = actionTypes.articlesData;

const initialState = {
  articles: [],
  isLoading: false,
  pageNumber: 1,
};

// eslint-disable-next-line default-param-last
const articlesData = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ARTICLES:
      return {
        ...state,
        isLoading: action.payload.status,
      };

    case SET_ARTICLES:
        return {
          ...state,
          articles: action.payload.articles,
        };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload.number,
      };

    default:
      return state;
  }
};

export default articlesData;
