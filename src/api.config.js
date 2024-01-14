import BASE_URL from "./services/utils/base-url";

export const API = {

    ARTICLES: {
        SUMMARY: (limit, page) => `${BASE_URL}/articles?limit=${limit}&offset=${page}`,
    },

    ARTICLE: {
        GET: slug => `${BASE_URL}/articles/${slug}`,
        CREATE: () => `${BASE_URL}/articles`,
        FAVORITE: slug => `${BASE_URL}/articles/${slug}/favorite`,
        DELETE: slug => `${BASE_URL}/articles/${slug}`,
    },

    AUTHENTICATION: {
        SIGN_UP: () => `${BASE_URL}/users`,
        LOGIN: () => `${BASE_URL}/users/login`,
        EDIT: () => `${BASE_URL}/user`,
    }
}