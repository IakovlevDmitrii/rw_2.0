import {FETCHING_AUTHENTICATION, UPDATE_USER} from "../actions";
import {LOG_OUT} from "../../components/header/actions";
import {FETCHING_ARTICLES} from "../../components/pages/articles-page/actions";
import {FETCHING_ARTICLE} from "../../components/pages/article-page/actions";
import {FETCHING_ARTICLE_CREATION} from "../../components/pages/new-article-page/actions";

const initialState = {
    currentUser: {},
    isFetching: false,
    isLoggedIn: false,
};

// eslint-disable-next-line default-param-last
export const reducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case FETCHING_ARTICLES:
            return {
                ...state,
                isFetching: payload.status,
            };

        case FETCHING_ARTICLE:
            return {
                ...state,
                isFetching: payload.status,
            };

        case FETCHING_AUTHENTICATION:
            return {
                ...state,
                isFetching: payload.status,
            };

        case FETCHING_ARTICLE_CREATION:
            return {
                ...state,
                isFetching: payload.status,
            };

        case LOG_OUT:
            return {
                currentUser: {},
                isFetching: state.isFetching,
                isLoggedIn: false,
            }

        case UPDATE_USER:
            return {
                currentUser: payload.user,
                isFetching: false,
                isLoggedIn: true,
            };

        default:
            return state;
    }
};
