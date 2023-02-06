import {getResource} from "../../../utils";

const favoriteAnArticle = async (token, slug, method) => {
    const requestOptions = {
        extraUrl: `articles/${slug}/favorite`,
        method,
        token,
    };

    return  getResource(requestOptions);
};

export default favoriteAnArticle;
