import React from "react";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function TopAlertComponent(props) {

    if(!props.props.display){
        return null
    }
    return (
        <Alert severity="success">
            <AlertTitle>{props.props.displayText}</AlertTitle>
        </Alert>
    )
}
