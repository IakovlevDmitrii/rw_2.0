import {combineReducers} from "redux";
import {reducer as common } from "./common-reducer";
import {reducer as articles} from "../../components/pages/articles-page/reducer";

const reducer = combineReducers({
    articles,
    common,
});

export default reducer;
