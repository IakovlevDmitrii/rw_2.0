import { combineReducers } from "redux";
// import articleData from "./articleData-reducers";
import {reducer as articlePage} from "../../components/pages/article-page/reducer";
import {reducer as homePage} from "../../components/pages/home-page/reducer";
import authentication from "./authentication-reducer";

const reducer = combineReducers({
  authentication,
  articlePage,
  homePage,
  // selectedArticle,
});

export default reducer;
