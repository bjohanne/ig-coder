import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const API_CALL_BEGIN = "API_CALL_BEGIN";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_ERROR = "API_CALL_ERROR";

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

export const sendApiRequest = (request: AxiosRequestConfig) => {
    return (dispatch) => {
        return axios(request)
    }
};

/*
    Variant that sets flags using the below synchronous action types.
    You can check for these flags in the specific reducer.
*/

export const sendApiRequestWithFlags = (request: AxiosRequestConfig) => {
    return (dispatch) => {
        dispatch({type: API_CALL_BEGIN, request});
        return axios(request)
        .then((response: AxiosResponse) => {
            dispatch({type: API_CALL_SUCCESS, response});
        }, (error: AxiosError) => {
            dispatch({type: API_CALL_ERROR, error});
        });
    }
};
