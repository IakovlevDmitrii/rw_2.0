import actionsTypes from "../actions-types";

const {
  LOADING_ARTICLE,
  SET_ARTICLE,
} = actionsTypes.articleData;

const loadingArticle = (status) => ({
  type: LOADING_ARTICLE,
  payload: { status },
});

const setArticle = (article) => ({
  type: SET_ARTICLE,
  payload: { article },
});

const articleData = {
  loadingArticle,
  setArticle,
};

export default articleData;
