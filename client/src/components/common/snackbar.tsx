import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/*
    Reusable Material UI snackbar.

    Import this component to add a snackbar to another component. Render this component,
    and pass the props `state`, `onClose`, `severity` and `displayText`.
    state: A React useState() variable that manages the state of the Snackbar
    onClose: A function that calls state's setState(false)
    severity: A string out of {"success", "info", "warning", "error"}
    displayText: The text to display in the snackbar body
*/

export default function SnackbarComponent(props) {

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar open={props.state} autoHideDuration={5000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.displayText}
            </Alert>
        </Snackbar>
    )
}
