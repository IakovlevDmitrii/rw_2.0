import {format} from "date-fns";

const getContent = (article) => {
    const {
        author = {
            image: "",
            username: "",
        },
        body = "",
        createdAt = "",
        description = "",
        favorited = false,
        favoritesCount = 0,
        slug = "",
        tagList = [""],
        title = "",
    } = article;

    return {
        author: {
            image: author.image,
            username: author.username,
        },
        body,
        createdAt: format(new Date(createdAt), "MMMM d, yyyy"),
        description,
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
    };
}

export default getContent;
