const BASE_URL = 'https://blog.kata.academy/api';

export const API = {

    ARTICLES: {
        SUMMARY: (limit, page) => `${BASE_URL}/articles?limit=${limit}&offset=${page}`,
    },

    ARTICLE: {
        GET: slug => `${BASE_URL}/articles/${slug}`,
        FAVORITE: slug => `${BASE_URL}/articles/${slug}/favorite`,
        CREATE: () => `${BASE_URL}/articles`,
        UPDATE: slug => `${BASE_URL}/articles/${slug}`,
        DELETE: slug => `${BASE_URL}/articles/${slug}`,
    },

    AUTHENTICATION: {
        SIGN_UP: () => `${BASE_URL}/users`,
        LOGIN: () => `${BASE_URL}/users/login`,
        EDIT: () => `${BASE_URL}/user`,
    },
}