import React, {useState} from "react";
import RegisterComponent from "./register";
import TopAlertComponent from "../common/topAlert";

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
        const url="http://0.0.0.0:5000/users/register"
        const data={
            first_name:state.firstname,
            last_name:state.lastname,
            email:state.username,
            password:state.pass
        }
        const otherPram ={
            headers:{
                "content-type":"application/json; charset=UTF-8"
            },
            body:JSON.stringify(data),
            method:"POST"
        }
        fetch(url,otherPram).then(
            data=>{return data.json()}
        ).then(
            res=>{
                const {error, token, result}=res
                if(error){
                    setState(
                        state=>(
                            {
                                ...state,
                                isFail:true
                            }
                        )
                    )
                }else if(result){
                    console.log(result)
                    setSignup(true)
                    setTimeout(()=>{
                        window.location = '/login'
                    }, 100)

                }
            }
        ).catch(
            error=>console.error(error)
        )
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
