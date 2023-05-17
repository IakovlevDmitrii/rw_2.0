import { combineReducers } from "redux";
// import articleData from "./articleData-reducers";
// import articlesData from "./articlesData-reducers";
import {reducer as articlePage} from "../../components/pages/article-page/reducer";
import {reducer as articles} from "../../components/articles/reducer";
import authentication from "./auth-reducer";

const reducer = combineReducers({
  authentication,
  articlePage,
  articles,
  // selectedArticle,
});

export default reducer;
