import {getResource} from "../../../utils";

const updateCurrentUser = async (token, detailsToChange) => {
    const requestOptions = {
        extraUrl: `user`,
        method: "PUT",
        token,
        data: {
            user: {
                ...detailsToChange,
            },
        }
    };

    return getResource(requestOptions);
};

export default updateCurrentUser;
