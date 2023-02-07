import {RECEIVE_ARTICLES, REQUEST_ARTICLES} from "./actions";

export const reducer = (state = {}, action) => {
    const {payload, type} = action

    switch (type){
        case REQUEST_ARTICLES:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_ARTICLES:
            return {
                ...state,
                list: payload,
                isFetching: false
            }

    }

}