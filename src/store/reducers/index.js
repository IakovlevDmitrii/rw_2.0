import { combineReducers } from "redux";
import articleData from "./articleData-reducers";
import articlesData from "./articlesData-reducers";
import authentication from "./auth-reducer";

const reducer = combineReducers({
  articleData,
  articlesData,
  authentication,
});

export default reducer;
