import { combineReducers } from "redux";
// import articleData from "./articleData-reducers";
// import articlesData from "./articlesData-reducers";
import {reducer as articlePage} from "../../components/pages/article-page/reducer";
import {reducer as articlesPage} from "../../components/pages/articles-page/reducer";
import authentication from "./auth-reducer";

const reducer = combineReducers({
  authentication,
  articlePage,
  articlesPage,
  // selectedArticle,
});

export default reducer;
