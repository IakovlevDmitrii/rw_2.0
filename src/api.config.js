import BASE_URL from "./services/utils/base-url";

export const API = {

    ARTICLES: {
        SUMMARY: (limit, page) => `${BASE_URL}/articles?limit=${limit}&offset=${page}`,
    },

    ARTICLE: {
        FAVORITE: slug => `${BASE_URL}/articles/${slug}/favorite`,
        CREATE: () => `${BASE_URL}/articles`,
        DELETE: slug => `${BASE_URL}/articles/${slug}`,
    },

}