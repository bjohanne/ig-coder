import firebase from "../../core/config/firebase";
import axios from "axios";
import {ISignUpData} from "../../core/config/interfaces";
import {OPEN_SNACKBAR} from "../ui/actions";

// Action types
export const AUTH_BEGIN = "AUTH_BEGIN";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";

// Signing UP
export const signUp = (data: ISignUpData, onSuccess, onError) => async dispatch => {
    dispatch({ type: AUTH_BEGIN });
    firebase
    .auth()
    .createUserWithEmailAndPassword(data.username, data.password)
    .then((fbData) => {
        // Send some of the user data to the SQL database via the backend server
        axios({
            url: "/users",
            method: "post",
            data: {
                "foreign_id": fbData.user.uid,
                "first_name": data.firstname,
                "last_name": data.lastname
            }
        })
        .then(() => {
            // Send some of the user data to the Firestore database
            firebase
            .firestore()
            .collection("users").add({
                "user_id":fbData.user.uid,
                "first_name":data.firstname,
                "last_name":data.lastname,
                "email":data.username
            })
            .then(() => {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: "Account created! We've signed you in, too."
                });
                onSuccess();
            })
            .catch(() => {
                // Errors with Firestore
                let errorMsg = "Something went wrong, we couldn't create your account. Please try again.";
                dispatch({
                    type: AUTH_ERROR,
                    payload: errorMsg
                });
                onError(errorMsg);
            });
        })
        .catch(() => {
            // Errors with the backend server
            firebase.auth().currentUser.delete()
            .then(() => {
                console.error("User creation undone due to a backend server error.");
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                let errorMsg = "We couldn't create your account due to a server error. Please try again.";
                dispatch({
                    type: AUTH_ERROR,
                    payload: errorMsg
                });
                dispatch({
                    type: OPEN_SNACKBAR
                });
            })
        });
    })
    .catch(() => {
        // Errors with Firebase Auth
        let errorMsg = "Something went wrong, we couldn't create your account. Please try again.";
        dispatch({
            type: AUTH_ERROR,
            payload: errorMsg
        });
        onError(errorMsg);
    });
};

// Signing IN
export const signIn = (email, password, persistMode, onSuccess, onError) => async dispatch => {
    dispatch({ type: AUTH_BEGIN });
    firebase
    .auth()
    .setPersistence(persistMode)
    .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({
                type: AUTH_SUCCESS,
                payload: "Signed in!"
            });
            onSuccess();
        })
        .catch(() => {
            let errorMsg = "Invalid login credentials.";
            dispatch({
                type: AUTH_ERROR,
                payload: errorMsg
            });
            onError(errorMsg);
        });
    })
    .catch(() => {
        let errorMsg = "Something went wrong, we couldn't sign you in. Please try again.";
        dispatch({
            type: AUTH_ERROR,
            payload: errorMsg
        });
        onError(errorMsg);
    });
};

// Signing OUT
export const signOut = (onSuccess, onError) => async dispatch => {
    dispatch({ type: AUTH_BEGIN });
    firebase
    .auth()
    .signOut()
    .then(() => {
        dispatch({
            type: AUTH_SUCCESS,
            payload: "Signed out."
        });
        onSuccess();
    })
    .catch(() => {
        let errorMsg = "Something went wrong, we couldn't sign you out. Please try again.";
        dispatch({
            type: AUTH_ERROR,
            payload: errorMsg
        });
        onError(errorMsg);
    });
};

// Resetting password
export const resetPassword = (email, onSuccess, onError) => async dispatch => {
    dispatch({ type: AUTH_BEGIN });
    firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
        dispatch({
            type: AUTH_SUCCESS,
            payload: "Reset email sent. Please check your inbox."
        });
        onSuccess();
    })
    .catch(err => {
        let errorMsg = "Something went wrong, we couldn't send you the email. Please try again.";
        dispatch({
            type: AUTH_ERROR,
            payload: errorMsg
        });
        onError(errorMsg);
    });
};
