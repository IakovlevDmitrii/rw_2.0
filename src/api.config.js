import BASE_URL from "./services/utils/base-url";

export const API = {

    ARTICLES: {
        SUMMARY: (limit, page) => `${BASE_URL}/articles?limit=${limit}&offset=${page}`
    }

}