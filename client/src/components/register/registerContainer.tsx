import React, {useState, useRef, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import firebase from "../../core/config/firebase";
import "firebase/auth";
import "firebase/firestore";

import RegisterComponent from "./register";
import {ISignUpData} from "../../core/config/interfaces";
import pageTitles from "../../core/config/pageTitles";
import {signUp} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";

function RegisterContainer(props) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.register;
    });

    const {loading, signUp, openSnackbar} = props;

    const [state, setState]=useState({
        firstname: "",
        lastname: "",
        username: "",
        pass: "",
        passConfirm: "",
        isSamePass: true,
        isFail: false,
        failText: "",
        showPassword: false
    })
    const submitButton = useRef(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setState({
            ...state,
            [name]: value,
            isFail:false,
            isSamePass:true
        })
        enableSubmitButton()
    }

    const handleClickShowPassword = (event) => {
        setState({
            ...state,
            showPassword:!state.showPassword
        })
    }

    const verifyPassSame=()=>{
        let isValid = state.pass===state.passConfirm
        setState({
            ...state,
            isFail:!isValid,
            failText:'The passwords do not match.',
        })
        return isValid
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
        setState({
            ...state,
            isFail: true,
            failText: errorMessage
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        if(!verifyPassSame()){
            return
        }
        disableSubmitButton();
        signUp({
                username: state.username,
                password: state.pass,
                firstname: state.firstname,
                lastname: state.lastname
            },
            () => {
                openSnackbar();
            },
            (errorMsg) => {
                displayError(errorMsg);
                enableSubmitButton();
            }
        );
    }

    return (
        <>
            <RegisterComponent data={state} handleChange={handleChange} handleSubmit={handleSubmit}
                handleClickShowPassword={handleClickShowPassword}
                loading={loading} submitButton={submitButton}/>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.user.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    signUp: (data: ISignUpData, onSuccess, onError) =>
        dispatch(signUp(data, onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterContainer));
