import React, {useState, useRef} from "react";
import {withRouter, useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import RegisterComponent from "./register";
import SnackbarComponent from "../common/snackbar";
import {processBegin, processSuccess, processError} from "../../state/apiRequest/actions";
import {sendServerRequest} from "../../state/apiRequest/actions";

function RegisterContainer(props: any) {
    const {processBegin, processSuccess, processError, sendServerRequest} = props;

    let history = useHistory()  // For redirecting

    const [state, setState]=useState({
        firstname:'',
        lastname:'',
        username: "",
        pass: "",
        passConfirm:"",
        isSamePass:true,
        isFail:false,
        failText:'',
        showPassword: false
    })
    const [snackbar,setSnackbar] = useState(false);

    const submitButton = useRef(null);

    const handleChange = (event) => {
        const {name, value} = event.target
        setState(
            state=>({
                ...state,
                [name]: value,
                isFail:false,
                isSamePass:true
            })
        )
    }

    const handleClickShowPassword = (event) => {
        setState(
            state=>({
                ...state,
                showPassword:!state.showPassword
            })
        )
    }

    const verifyPassSame=()=>{
        setState(
            state=>({
                ...state,
                isFail:state.pass!==state.passConfirm,
                failText:'The passwords do not match.',
            })
        )
        return state.pass===state.passConfirm
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getUserData=(userId)=>{
        var db = firebase.firestore();
        db.collection("users").where("user_id", "==", userId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    const disableSubmitButton=()=>{
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = true;
        }
    }

    const enableSubmitButton=()=>{
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = false;
        }
    }

    const displayError=(errorMessage)=>{
        setState(
            state=>({
                ...state,
                isFail: true,
                failText: errorMessage
            })
        )
    }

    const registerUser=()=>{
        disableSubmitButton();
        processBegin();
        // Register the user with Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(state.username, state.pass)
        .then(data=>{
            // Send some of the user data to the Firestore database
            const db = firebase.firestore();
            db.collection("users").add({
                    "user_id":data.user.uid,
                    "first_name":state.firstname,
                    "last_name":state.lastname,
                    "email":state.username
            })
            .then((docRef)=>{
                // Send some of the user data to the SQL database
                sendServerRequest({
                    url: "/users",
                    method: "post",
                    data: {
                        "foreign_id": data.user.uid,
                        "first_name": state.firstname,
                        "last_name": state.lastname
                    }
                })
                .then((response: AxiosResponse) => {
                    // Success!
                    setSnackbar(true)
                    setTimeout(()=>{
                        processSuccess();
                        history.push("/login"); // Can't use the Redirect component here
                    }, 1000)    // Wait a second so the user can read the snackbar message
                }, (error: AxiosError) => {
                    // Errors with the SQL DB
                    processError(error);
                    displayError("Sorry, a database error occured.");
                    enableSubmitButton(); // Reenable the submit button so the user can try again
                });
            })
            .catch((error)=>{
                // Errors with Firestore
                processError(error);
                displayError("Sorry, a database error occured.");
                enableSubmitButton(); // Reenable the submit button so the user can try again
            });

        })
        .catch((error)=>{
            // Errors with Firebase Auth (that can be displayed to the user)
            processError(error);
            displayError(error.message);
            enableSubmitButton(); // Reenable the submit button so the user can try again
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        if(!verifyPassSame()){
            return
        }
        registerUser()
    }

    return (
        <div>
            <SnackbarComponent state={snackbar} onClose={()=>setSnackbar(false)} severity="success" displayText="Sign up successful! Taking you to Sign in page..."/>
            <RegisterComponent data={state} handleChange={handleChange} handleSubmit={handleSubmit} handleClickShowPassword={handleClickShowPassword}
                loading={props.loading} submitButton={submitButton}/>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.userReducer.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    processBegin: () => { return dispatch(processBegin()) },
    processSuccess: () => { return dispatch(processSuccess()) },
    processError: (error: any) => { return dispatch(processError(error)) },
    sendServerRequest: (request: AxiosRequestConfig) => { return dispatch(sendServerRequest(request)) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterContainer));
