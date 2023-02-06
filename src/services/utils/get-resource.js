import BASE_URL from "./base-url";

const getResource = async (option) => {
    const {
        extraUrl,
        method,
        token = "",
        data = {},
    } = option;

    const body = method === "POST" || method === "PUT"
        ? JSON.stringify(data)
        : null;

    try {
        const response = await fetch(
            `${BASE_URL}/${extraUrl}`,
            {
                method,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Token ${token}`,
                },
                body,
            }
        );
        return response.json();

    } catch {
        throw new Error();
    }
}

export default getResource;
