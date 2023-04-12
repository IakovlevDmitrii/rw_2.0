import {
    REQUEST_ARTICLES,
    RECEIVE_ARTICLES,
    SELECT_ARTICLE,
    REQUEST_FAVORITE,
    FAVORITE_ARTICLE,
    ARTICLE_CREATION_REQUEST,
    CREATE_AN_ARTICLE,
} from "./actions";

const initialState = {
    articlesFetching: false,
    articleFetching: false,
    favoriteFetching: [],
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
        default:
            return state;
    }
}
