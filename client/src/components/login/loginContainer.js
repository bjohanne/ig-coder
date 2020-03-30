import React from "react";
import LoginComponent from "./login";

class LoginContainer extends React.Component {
    state = {
        username: "",
        pass: "",
        isRemember: false,
        isFail: false,
        showPassword: false
    }

    handleChange = (event) => {
        console.log(event.target)
        const {name, value, type, checked} = event.target
        const actuaValue = type === "CheckBox" ? checked : value
        this.setState({
            [name]: actuaValue,
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
        const url = "http://0.0.0.0:5000/users/login"
        const data = {
            email: this.state.username,
            password: this.state.pass
        }
        const otherPram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data),
            method: "POST"
        }
        fetch(url, otherPram).then( // TODO: This needs to go through Redux. Dispatch an action, send an Axios request and dispatch another action upon response. This component will wait for the action's reducer.
            data => {
                return data.json()
            }
        ).then(
            res => {
                const {error, token, result} = res
                console.log(res)
                if (error || result) {
                    this.setState(
                        {
                            isFail: true
                        }
                    )
                } else if (token) {
                    localStorage.setItem('usertoken', token)
                    window.location = '/';
                }
            }
        ).catch(
            error => console.error(error)
        )
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
