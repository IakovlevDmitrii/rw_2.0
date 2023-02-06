import actionTypes from "../actions-types";

const {
  LOADING_ARTICLE,
  SET_ARTICLE,
} = actionTypes.articleData;

const initialState = {
  article: {},
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const articleData = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ARTICLE:
      return {
        ...state,
        isLoading: action.payload.status,
      };

    case SET_ARTICLE:
      return {
        article: action.payload.article,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default articleData;
