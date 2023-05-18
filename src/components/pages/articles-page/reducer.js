import {
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    CHANGE_PAGE,
} from "./actions";
import {RECEIVE_FAVORITE_CHANGE} from "../../article/actions";

const initialState = {
    isFetching: false,
    currentPage: 1,
    articlesCount: 0,
    list: [],
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

    switch (type){
        case REQUEST_ARTICLES:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_ARTICLES:
            return {
                ...state,
                isFetching: false,
                articlesCount: payload.articlesCount,
                list: payload.list,
            }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: payload.page,
            }
        }
        case RECEIVE_FAVORITE_CHANGE:
            let list = [...state.list]
            let article = list.find(article => article.slug === payload.article.slug)
            Object.assign(article, payload.article)

            return {
                ...state,
                list,
            }
        default:
            return state;
    }
}
