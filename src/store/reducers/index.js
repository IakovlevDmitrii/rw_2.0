import { combineReducers } from "redux";
// import articleData from "./articleData-reducers";
// import articlesData from "./articlesData-reducers";
import {reducer as articles} from "../../components/articles/reducer";
import authentication from "./auth-reducer";

const reducer = combineReducers({
  authentication,
  articles,
  // selectedArticle,
});

export default reducer;
