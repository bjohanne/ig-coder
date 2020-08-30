import React, {useState, useRef, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import firebase from "../../core/config/firebase";
import "firebase/auth";
import "firebase/firestore";

import LoginComponent from "./login";
import pageTitles from "../../core/config/pageTitles";
import {signIn} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";

function LoginContainer(props) {
    const {loading, signIn, openSnackbar} = props;


    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.login;
    });

    const [state, setState] = useState({
        username: "",
        pass: "",
        isRemember: false,
        isFail: false,
        failText: "",
        showPassword: false
    })

    const submitButton = useRef(null)

    const handleChange = (event) => {
        const {name, value, checked} = event.target
        const newValue = name === "isRemember" ? checked : value
        setState({
            ...state,
            [name]: newValue,
            isFail: false
        })
        enableSubmitButton()
    }

    const handleClickShowPassword = (event) => {
        setState({
            ...state,
            showPassword:!state.showPassword
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
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        disableSubmitButton();
        // Set whether to persist this user's login state. Local means the user stays logged in until they sign out.
        let persistMode = (state.isRemember) ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
        signIn(state.username, state.pass, persistMode,
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
            <LoginComponent data={state} handleChange={handleChange}
                handleSubmit={handleSubmit} submitButton={submitButton}
                handleClickShowPassword={handleClickShowPassword}
                loading={loading} />
        </>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.user.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    signIn: (email, password, persistMode, onSuccess, onError) =>
        dispatch(signIn(email, password, persistMode, onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginContainer));
