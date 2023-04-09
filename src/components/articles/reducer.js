// import {getContent} from "../../services/utils";
import {
    RECEIVE_ARTICLES,
    REQUEST_ARTICLES,
    SELECT_ARTICLE,
    FAVORITE_ARTICLE,
    // REMOVE_ARTICLE_FROM_SELECTED,
} from "./actions";

const initialState = {
    isArticlesFetching: false,
    articlesCount: 0,
    selected: '',
    list: [],
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

    switch (type){
        case REQUEST_ARTICLES:
            return {
                ...state,
                isArticlesFetching: true
            }
        case RECEIVE_ARTICLES:
            return {
                ...state,
                isArticlesFetching: false,
                articlesCount: payload.articlesCount,
                selected: '',
                list: payload.articles,
            }
        case SELECT_ARTICLE:
            return {
                ...state,
                selected: payload,
            }
        case FAVORITE_ARTICLE:

            return {
                ...state,
                list: payload,
            }
        // case REMOVE_ARTICLE_FROM_SELECTED:
        //     return {
        //         ...state,
        //         selected: "",
        //     }
        default:
            return state;
    }
}
