import {ARTICLE_FETCHING, RECEIVE_ARTICLE} from "./actions";
import {RECEIVE_FAVORITE_CHANGE} from "../../article/actions";
import {ARTICLE_CREATION_FETCHING} from "../new-article-page/actions";

const initialState = {
    article: {},
    isFetching: false,
};

export const reducer = (state = initialState, action) => {
    const {payload, type} = action;

    switch (type) {
        case ARTICLE_FETCHING:
            return {
                ...state,
                isFetching: payload.status,
            };

        case RECEIVE_ARTICLE:
            return {
                ...state,
                article: payload.article,
            };

        case RECEIVE_FAVORITE_CHANGE:
            return {
                ...state,
                article: payload.article,
            };

        case ARTICLE_CREATION_FETCHING:
            return {
                ...state,
                isFetching: payload.status,
            };

        default:
            return state;
    }
}