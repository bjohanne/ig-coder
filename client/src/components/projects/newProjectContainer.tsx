import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {openSnackbar} from "../../state/ui/actions";
import NewProject from "./newProject";

export function NewProjectContainer(props) {
    const {
        //loading,
        //createDocument,
        //openSnackbar,
        dialogOpen,
        handleClose
    } = props;

    const [state, setState] = useState({
        name: "",
        visibility: "",
        description: "",
        isFail: false,
        failText: ""
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const history = useHistory();
    const submitButton = useRef(null);

    const handleChange = (event) => {
        const {name, value} = event.target
        const newValue = name === "visibility" ? Number(value) : value;
        setState({
            ...state,
            [name]: newValue,
            isFail: false
        });
        enableSubmitButton();
    };

    const validateVisibility = () => {
        let isValid = [1,2,3].includes(Number(state.visibility));
        setState({
            ...state,
            isFail:!isValid,
            failText:"Please select a visibility.",
        });
        return isValid;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const disableSubmitButton = () => {
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = true;
        }
    }

    const enableSubmitButton = () => {
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = false;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const displayError = (errorMessage) => {
        setState({
            ...state,
            isFail: true,
            failText: errorMessage
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!validateVisibility()) {
            return;
        }
        console.log("Create Project form successfully submitted.");
    };

    return (
        <NewProject
            loading={false}
            dialogOpen={dialogOpen}
            handleClose={handleClose}
            data={state}
            handleChange={handleChange}
            submitButton={submitButton}
            handleSubmit={handleSubmit}
        />
    );
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProjectContainer);
