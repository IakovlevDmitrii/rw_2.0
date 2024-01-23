import {
    FETCHING_ARTICLES,
    RECEIVE_ARTICLES,
    CHANGE_PAGE_NUMBER,
} from "./actions";
import {RECEIVE_FAVORITE_CHANGE} from "../../article/actions";
import {CREATE_AN_ARTICLE} from "../new-article-page/actions";

const initialState = {
    isFetching: false,
    currentPage: 1,
    articlesCount: 0,
    articlesList: [],
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

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
                articlesList: payload.articlesList,
            };

        case CHANGE_PAGE_NUMBER:
            return {
                ...state,
                currentPage: payload.pageNumber,
            };

        case RECEIVE_FAVORITE_CHANGE:
            let articlesList = [...state.articlesList];
            let article = articlesList.find(article => article.slug === payload.article.slug)
            Object.assign(article, payload.article)

            return {
                ...state,
                articlesList,
            };

        case CREATE_AN_ARTICLE:
            return {
                ...state,
                articlesList: payload.articlesList,
            };

        default:
            return state;
    }
}
