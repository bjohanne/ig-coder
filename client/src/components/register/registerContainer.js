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
        const {name, value} = event.target
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
    }

    const handleClickShowPassword = (event) => {
        setState(
            state=>(
                {
                    ...state,
                    showPassword:!state.showPassword
                }
            )
        )
    }

    const verifyPassSame=()=>{
        console.log('verify password same')
        setState(
            state=>(
                {
                    ...state,
                    isFail:state.pass!==state.passConfirm,
                    failText:'The passwords do not match.',
                }
            )
        )
        return state.pass===state.passConfirm
    }

    const addUserData=(userId)=>{
        var db = firebase.firestore();
        db.collection("users").add({
                "userId":userId,
                "firstName":state.firstname,
                "lastName":state.lastname,
                "email":state.username,
                "privilege":0
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

    const getUserData=(userId)=>{
        var db = firebase.firestore();
        db.collection("users").where("userId", "==", userId)
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

    const handleSubmit =(event)=>{
        event.preventDefault()
        if(!verifyPassSame()){
            return
        }
        firebase.auth().createUserWithEmailAndPassword(state.username, state.pass)
            .then(data=>{
                setSignup(true)
                addUserData(data.user.uid)
                //getUserData(data.user.uid)
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
            <TopAlertComponent props={{display:signup,displayText:'Sign up successful! Taking you to Sign in page...'}}/>
            <RegisterComponent data={state} handleChange={handleChange} handleSubmit={handleSubmit} handleClickShowPassword={handleClickShowPassword}/>
        </div>
    )
}

export default RegisterContainer
