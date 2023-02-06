import {getContent, getResource} from "../../../utils";

const updateAnArticle = async (token, slug, detailsToChange) => {
    const requestOptions = {
        extraUrl: `articles/${slug}`,
        method: "PUT",
        token,
        data: {
            article: {
                ...detailsToChange,
            },
        }
    };

    const response = await getResource(requestOptions);
    const article = getContent(response.article);

    return {article};
};

export default updateAnArticle;