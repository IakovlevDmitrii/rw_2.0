import {getResource} from "../../../utils";
import {adeptArticle} from "../../../../utils/adept-article";

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
    const article = adeptArticle(response.article);

    return {article};
};

export default updateAnArticle;