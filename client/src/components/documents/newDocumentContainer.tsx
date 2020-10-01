import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {createDocument} from "../../state/documents/actions";
import {openSnackbar} from "../../state/ui/actions";
import NewDocument from "./newDocument";

export function NewDocumentContainer(props) {
    const {
        loading,
        createDocument,
        openSnackbar,
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
        disableSubmitButton();
        createDocument(state.name, state.description, state.visibility,
            (id) => {
                history.push(`/documents/${id}`);
                openSnackbar();
            },
            (errorMsg) => {
                displayError(errorMsg);
                enableSubmitButton();
            }
        );
    };

    return (
        <NewDocument
            loading={loading}
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
    loading: state.documents.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    createDocument: (name, description, visibility, onSuccess, onError) =>
        dispatch(createDocument(name, description, visibility, onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewDocumentContainer);
