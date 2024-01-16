import { combineReducers } from "redux";
import { reducer as articlePage } from "../../components/pages/article-page/reducer";
import authentication from "./authentication-reducer";
import { reducer as homePage } from "../../components/pages/home-page/reducer";

const reducer = combineReducers({
  articlePage,
  authentication,
  homePage,
});

export default reducer;
