import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/*
    Asynchronous action that simply makes an Axios request with the passed in config.
    Use this if you need additional processing in between states, and dispatch the below
    synchronous action types yourself.
    You can attach the following to a dispatch of this action to wait for a response:

    .then((response: AxiosResponse) => {
        // handle success
    }, (error: AxiosError) => {
        // handle error
    });
*/

export const sendServerRequest = (request: AxiosRequestConfig) => {
    return (dispatch) => {
        return axios(request)
    }
};

/*
    Variant that sets flags using the below synchronous action types.
    You can check for these flags in the specific reducer.
*/

export const sendServerRequestWithFlags = (request: AxiosRequestConfig) => {
    return (dispatch) => {
        dispatch({type: PROCESS_BEGIN, request});
        return axios(request)
        .then((response: AxiosResponse) => {
            dispatch({type: PROCESS_SUCCESS, response});
        }, (error: AxiosError) => {
            dispatch({type: PROCESS_ERROR, error});
        });
    }
};

/*
    Three synchronous action types for telling the reducers the status of a process (usually involving a server request)
*/

export const PROCESS_BEGIN = "PROCESS_BEGIN";
export const processBegin = (request?: AxiosRequestConfig) => {
    return {
        type: PROCESS_BEGIN,
        request
    }
};

export const PROCESS_SUCCESS = "PROCESS_SUCCESS";
export const processSuccess = (response?: AxiosResponse) => {
    return {
        type: PROCESS_SUCCESS,
        response
    }
};

export const PROCESS_ERROR = "PROCESS_ERROR";
export const processError = (error: any) => {  // "any" type because this is also used for Firebase errors
    return {
        type: PROCESS_ERROR,
        error
    }
};
