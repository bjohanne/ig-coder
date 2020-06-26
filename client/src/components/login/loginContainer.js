import React from "react";
import LoginComponent from "./login";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class LoginContainer extends React.Component {
    state = {
        username: "",
        pass: "",
        isRemember: false,
        isFail: false,
        failText:'',
        showPassword: false
    }

    handleChange = (event) => {
        console.log(event.target)
        const {name, value, type, checked} = event.target
        const actualValue = type === "CheckBox" ? checked : value
        this.setState({
            [name]: actualValue,
            isFail: false
        })
    }

    handleClickShowPassword = (event) => {
        console.log(event.target)
        this.setState({
            showPassword:!this.state.showPassword
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.pass)
            .then(data => {
                    localStorage.setItem('usertoken', data.user.getIdToken())
                    window.location = '/';
                }
            )
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                this.setState(
                    {
                        isFail: true,
                        failText: errorMessage
                    }
                )
            });
        console.log("handle submit")
    }

    render() {
        return (
            <div>
                <LoginComponent data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}
                       handleClickShowPassword={this.handleClickShowPassword}/>
            </div>
        )
    }
}

export default LoginContainer
