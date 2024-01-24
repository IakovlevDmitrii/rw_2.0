// import {FETCHING_ARTICLE, RECEIVE_ARTICLE} from "./actions";
// import {RECEIVE_FAVORITE_CHANGE} from "../../article/actions";
// import {FETCHING_ARTICLE_CREATION} from "../new-article-page/actions";
// import {REQUEST_TO_REMOVE_ARTICLE} from "../../article/actions";
//
// const initialState = {
//     article: {},
//     isFetching: false,
// };
//
// export const reducer = (state = initialState, action) => {
//     const {payload, type} = action;
//
//     switch (type) {
//         case FETCHING_ARTICLE:
//             return {
//                 ...state,
//                 isFetching: payload.status,
//             };
//
//         case RECEIVE_ARTICLE:
//             return {
//                 ...state,
//                 article: payload.article,
//             };
//
//         case RECEIVE_FAVORITE_CHANGE:
//             return {
//                 ...state,
//                 article: payload.article,
//             };
//
//         case FETCHING_ARTICLE_CREATION:
//             return {
//                 ...state,
//                 isFetching: payload.status,
//             };
//
//         case REQUEST_TO_REMOVE_ARTICLE:
//             return {
//                 ...state,
//                 isFetching: payload.status,
//             }
//
//         default:
//             return state;
//     }
// }