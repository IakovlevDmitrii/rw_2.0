import {getContent, getResource} from "../../../utils";

const getArticles = async (token, page) => {
    const requestOptions = {
        extraUrl: `articles?limit=5&offset=${(page - 1) * 5}`,
        method: "GET",
        token,
    };

    const response = await getResource(requestOptions);
    const { articles, articlesCount } = response;

    const newArticles = articles.map(article => getContent(article));

    return {
        articles: newArticles,
        articlesCount,
    };
}

export default getArticles;
