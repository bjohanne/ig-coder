import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/*
    Asynchronous action that simply makes an Axios request with the passed in config.
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
    Three synchronous action creators for telling the reducers the status of the server request (currently unused)
*/

export const FETCH_BEGIN = "FETCH_BEGIN";
export const fetchBegin = (request: AxiosRequestConfig) => {
    return {
        type: FETCH_BEGIN,
        payload: request
    }
};

export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const fetchSuccess = (response: AxiosResponse) => {
    return {
        type: FETCH_SUCCESS,
        payload: response
    }
};

export const FETCH_FAILURE = "FETCH_FAILURE";
export const fetchFailure = (error: AxiosError) => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
};
