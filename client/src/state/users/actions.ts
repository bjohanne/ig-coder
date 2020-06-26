export const USER_REG_BEGIN = "USER_REG_BEGIN";
export const USER_REG_SUCCESS = "USER_REG_SUCCESS";
export const USER_REG_ERROR = "USER_REG_ERROR";

/*
    Three synchronous action creators for telling the reducers the status of the user registration process
*/

export const userRegBegin = () => {
    return {
        type: USER_REG_BEGIN
    }
};

export const userRegSuccess = () => {
    return {
        type: USER_REG_SUCCESS
    }
};

export const userRegError = (error: any) => {
    return {
        type: USER_REG_ERROR,
        error
    }
};
