import React from "react";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function TopAlertComponent(props) {

    console.log('TopAlert:'+props)
    console.log(props)

    if(!props.props.display){
        return null
    }
    console.log(props)
    return (
        <Alert severity="success">
            <AlertTitle>{props.props.displayText}</AlertTitle>
        </Alert>
    )
}
