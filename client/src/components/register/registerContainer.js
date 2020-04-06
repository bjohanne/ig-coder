import React, {useState} from "react";
import RegisterComponent from "./register";
import TopAlertComponent from "../common/topAlert";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function RegisterContainer() {

    const [state, setState]=useState(
        {
            firstname:'',
            lastname:'',
            username: "",
            pass: "",
            passConfirm:"",
            isSamePass:true,
            isFail:false,
            failText:'',
            showPassword: false
        }
    )
    const[signup,setSignup]=useState(false)


    const handleChange = (event) => {
        console.log('handle change')
        const {name, value} = event.target
        console.log(name+" "+value)
        setState(
            state=>(
                {
                    ...state,
                    [name]: value,
                    isFail:false,
                    isSamePass:true
                }
            )
        )
       console.log(state)
    }

    const handleClickShowPassword = (event) => {
        console.log(event.target)
        setState(
            state=>(
                {
                    ...state,
                    showPassword:!state.showPassword
                }
            )
        )
    }

    const verfifyPassSame=()=>{
        if(state.pass!==state.passConfirm){
            setState(
                state=>(
                    {
                        ...state,
                        isSamePass:false
                    }
                )
            )
            return false
        }else {
            setState(
                state=>(
                    {
                        ...state,
                        isSamePass:true
                    }
                )
            )
            return true
        }
    }

    const handleSubmit =(event)=>{
        event.preventDefault()
        if(!verfifyPassSame()){
            return
        }
        firebase.auth().createUserWithEmailAndPassword(state.username, state.pass)
            .then(data=>{
                setSignup(true)
                setTimeout(()=>{
                    window.location = '/login'
                }, 100)
            })
            .catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                setState(
                    state=>(
                        {
                            ...state,
                            isFail:true,
                            failText:errorMessage
                        }
                    )
                )
            });
        console.log("handle submit")
    }

    return (
        <div>
            <TopAlertComponent props={{display:signup,displayText:'Sign up successfully! Now turning to Sign In page....'}}/>
            <RegisterComponent data={state} handleChange={handleChange} handleSubmit={handleSubmit} handleClickShowPassword={handleClickShowPassword}/>
        </div>
    )
}

export default RegisterContainer
