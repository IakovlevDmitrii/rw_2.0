import BASE_URL from "./services/utils/base-url";

export const API = {

    ARTICLES: {
        SUMMARY: (limit, page) => `${BASE_URL}/articles?limit=${limit}&offset=${page}`,
    },

    ARTICLE: {
        GET: slug => `${BASE_URL}/articles/${slug}`,
        FAVORITE: slug => `${BASE_URL}/articles/${slug}/favorite`,
        CREATE: () => `${BASE_URL}/articles`,
        DELETE: slug => `${BASE_URL}/articles/${slug}`,
    },

    AUTHENTICATION: {
        LOGIN: () => `${BASE_URL}/user/login`,
    }
}