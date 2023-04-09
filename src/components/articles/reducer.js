import {
    RECEIVE_ARTICLES,
    REQUEST_ARTICLES,
    SELECT_ARTICLE,
    FAVORITE_ARTICLE,
    REQUEST_FAVORITE,
} from "./actions";

const initialState = {
    isArticlesFetching: false,
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
                isArticlesFetching: true
            }
        case RECEIVE_ARTICLES:
            return {
                ...state,
                isArticlesFetching: false,
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
        default:
            return state;
    }
}
