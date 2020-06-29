import React, {useState, useRef} from "react";
import {withRouter, useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import LoginComponent from "./login";
import SnackbarComponent from "../common/snackbar";
import {processBegin, processSuccess, processError} from "../../state/apiRequest/actions";
import {loginUser} from "../../state/users/actions";

function LoginContainer(props: any) {
    const {processBegin, processSuccess, processError, loginUser} = props;

    const [state, setState] = useState({
        username: "",
        pass: "",
        isRemember: false,
        isFail: false,
        failText:'',
        showPassword: false
    })
    const [snackbar,setSnackbar] = useState(false)
    const history = useHistory()
    const submitButton = useRef(null)

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target
        const actualValue = type === "checkbox" ? checked : value
        setState(
            state=>({
                ...state,
                [name]: actualValue,
                isFail: false
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

    const handleSubmit = (event) => {
        event.preventDefault()
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = true;
        }
        processBegin();
        firebase.auth().signInWithEmailAndPassword(state.username, state.pass)
        .then(data => {
            setSnackbar(true)
            setTimeout(()=>{
                processSuccess();
                loginUser(data.user.getIdToken());
                history.push("/");
            }, 1000)    // Wait a second so the user can read the snackbar message
        })
        .catch((error) => {
            processError(error);
            setState(
                state=>({
                    ...state,
                    isFail: true,
                    failText: error.message
                })
            )
            if (submitButton && submitButton.current) {
                submitButton.current.disabled = false;
            }
        });
    }

    return (
        <div>
            <SnackbarComponent state={snackbar} onClose={()=>setSnackbar(false)} severity="success" displayText="Signing in..."/>
            <LoginComponent data={state} handleChange={handleChange} handleSubmit={handleSubmit} submitButton={submitButton}
                handleClickShowPassword={handleClickShowPassword} loading={props.loading}/>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.userReducer.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    processBegin: () => dispatch(processBegin()),
    processSuccess: () => dispatch(processSuccess()),
    processError: (error: any) => dispatch(processError(error)),
    loginUser: (token: any) => dispatch(loginUser(token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginContainer));
