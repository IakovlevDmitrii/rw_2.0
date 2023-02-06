const BASE_URL = 'https://blog.kata.academy/api';

const deleteAnArticle = async (token, slug) => {
    const url = `${BASE_URL}/articles/${slug}`;

    try {
        const response = await fetch(
            url,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Token ${token}`,
                },
            }
        );

        return !!response.ok;
    } catch {
        throw new Error();
    }
};

export default deleteAnArticle;
