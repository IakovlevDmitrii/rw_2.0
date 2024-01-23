import {
    CHANGE_PAGE_NUMBER,
    FETCHING_ARTICLES,
    RECEIVE_ARTICLES,
} from "./actions";
import { RECEIVE_FAVORITE_CHANGE } from "../../article/actions";
import { CREATE_AN_ARTICLE } from "../new-article-page/actions";

const initialState = {
    articlesCount: 0,
    currentPage: 1,
    isFetching: false,
    list: [],
};

export const reducer = (state = initialState, action)=> {
    const { payload, type } = action;

    switch (type){
        case FETCHING_ARTICLES:
            return {
                ...state,
                isFetching: payload.status,
            };

        case RECEIVE_ARTICLES:
            return {
                ...state,
                articlesCount: payload.articlesCount,
                list: payload.list,
            };

        case CHANGE_PAGE_NUMBER:
            return {
                ...state,
                currentPage: payload.pageNumber,
            };

        case RECEIVE_FAVORITE_CHANGE:
            let list = [...state.list];
            let article = list.find(item => item.slug === payload.article.slug)
            Object.assign(article, payload.article)

            return {
                ...state,
                list,
            };

        case CREATE_AN_ARTICLE:
            return {
                ...state,
                list: payload.list,
            };

        default:
            return state;
    }
}
