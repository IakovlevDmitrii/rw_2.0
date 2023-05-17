import {
    REQUEST_ARTICLE,
    RECEIVE_ARTICLE,
} from "./actions";
import {RECEIVE_FAVORITE_CHANGE} from "../../article/actions";

const initialState = {
    isFetching: false,
    articleContent: {},
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

    switch (type) {
        case REQUEST_ARTICLE:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_ARTICLE:
            return {
                ...state,
                isFetching: false,
                articleContent: payload.articleContent,
            }
        case RECEIVE_FAVORITE_CHANGE:
            return {
                ...state,
                articleContent: payload.article,
            }
/*
        case ARTICLE_CREATION_REQUEST:
            return {
                ...state,
                articleFetching: payload.status,
            }
*/
/*
        case CREATE_AN_ARTICLE:
            return {
                ...state,
                list: payload.list,
                articleFetching: false,
            }
*/
/*
        case REQUEST_TO_REMOVE_ARTICLE:
            return {
                ...state,
                articleFetching: payload.status,
            }
*/
        default:
            return state;
    }
}