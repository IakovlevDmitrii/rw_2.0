import {getResource} from "../../../utils";

const existingUserLogin = async (email, password) => {
    const requestOptions = {
        extraUrl: `users/login`,
        method: "POST",
        data: {
            user: {
                email,
                password,
            },
        }
    };

    return getResource(requestOptions);
};

export default existingUserLogin;
