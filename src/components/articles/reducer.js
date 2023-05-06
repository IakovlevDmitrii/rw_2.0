import {
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    CHANGE_PAGE,
    SELECT_ARTICLE,
    REQUEST_FAVORITE,
    FAVORITE_ARTICLE,
    ARTICLE_CREATION_REQUEST,
    CREATE_AN_ARTICLE,
    REQUEST_TO_REMOVE_ARTICLE,
} from "./actions";

const initialState = {
    articleFetching: false,
    articlesCount: 0,
    articlesFetching: false,
    currentPage: 1,
    favoriteFetching: [],
    selected: '',
    list: [],
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

    switch (type){
        case REQUEST_ARTICLES:
            return {
                ...state,
                articlesFetching: true
            }
        case RECEIVE_ARTICLES:
            return {
                ...state,
                articlesFetching: false,
                articleFetching: false,
                favoriteFetching: [],
                articlesCount: payload.articlesCount,
                selected: '',
                list: payload.list,
            }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: payload.page,
            }
        }
        case SELECT_ARTICLE:
            return {
                ...state,
                selected: payload.slug,
            }
        case FAVORITE_ARTICLE:
            return {
                ...state,
                list: payload.list,
                favoriteFetching: payload.favoriteFetching,
            }
        case REQUEST_FAVORITE:
            return {
                ...state,
                favoriteFetching: payload.favoriteFetching,
            }
        case ARTICLE_CREATION_REQUEST:
            return {
                ...state,
                articleFetching: payload.status,
            }
        case CREATE_AN_ARTICLE:
            return {
                ...state,
                list: payload.list,
                articleFetching: false,
            }
        case REQUEST_TO_REMOVE_ARTICLE:
            return {
                ...state,
                articleFetching: payload.status,
            }
        default:
            return state;
    }
}
