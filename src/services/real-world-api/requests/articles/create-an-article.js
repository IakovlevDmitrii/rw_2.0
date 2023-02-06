import {getContent, getResource} from "../../../utils";

const createAnArticle = async  (token, newArticleContent) => {
    const requestOptions = {
        extraUrl: `articles`,
        method: "POST",
        token,
        data: {
            article: {
                ...newArticleContent,
            },
        }
    };

    const response = await getResource(requestOptions);
    const article = getContent(response.article);

    return {article};
};

export default createAnArticle;