import {API} from "../../api.config";

export const REQUEST_ARTICLES = "REQUEST_ARTICLES"
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES"




export const requestArticles = (limit, page) => (dispatch, getState) => {

    dispatch({type: REQUEST_ARTICLES, payload: {limit, page}})

    return fetch( API.ARTICLES.SUMMARY(limit, page), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => receiveArticles(result))
    .catch(e => console.log(`[GET ARTICLES] error ${e.toLocaleString()}`))
}


export const receiveArticles = payload => {
    return {
        type: RECEIVE_ARTICLES,
        payload: payload,
        receivedAt: Date.now()
    }
}