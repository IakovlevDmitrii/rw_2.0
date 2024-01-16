export const LOG_OUT = "LOG_OUT";

export const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    });
};
