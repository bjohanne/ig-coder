export const LOGIN_USER = "LOGIN_USER";
export const loginUser = (token: any) => {
    return {
        type: LOGIN_USER,
        token
    }
};

export const LOGOUT_USER = "LOGOUT_USER";
export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};
