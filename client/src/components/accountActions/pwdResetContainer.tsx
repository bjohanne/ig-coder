import React, {useState, useRef, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import PasswordReset from "./pwdReset";
import pageTitles from "../../core/config/pageTitles";
import {resetPassword} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";

function PasswordResetContainer(props) {
    const {loading, resetPassword, openSnackbar} = props;

    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.pwdReset;
    });

    const [state, setState] = useState({
        username: "",
        isFail: false,
        failText: ""
    })

    const submitButton = useRef(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setState(
            state=>({
                ...state,
                [name]: value,
                isFail: false
            })
        )
        enableSubmitButton()
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

    const handleSubmit = (event) => {
        event.preventDefault();
        disableSubmitButton();
        resetPassword(state.username,
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
            <PasswordReset data={state} handleChange={handleChange}
                handleSubmit={handleSubmit} submitButton={submitButton}
                loading={loading} />
        </>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.user.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    resetPassword: (email, onSuccess, onError) => dispatch(resetPassword(email, onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PasswordResetContainer));
