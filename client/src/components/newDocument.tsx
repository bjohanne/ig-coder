import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom';
import { AxiosRequestConfig } from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import SnackbarComponent from "./common/snackbar";
import {createDocument} from "../state/documents/actions";
import usePrevious from '../core/helpers/usePrevious';
import './newDocument.css';

export function NewDocumentComponent(props: any) {
    const {createDocument} = props;
    const [form, setValues] = useState({name: "", description: ""});
    const [redirect, setRedirect] = useState(false);
	const prevDocument = usePrevious(props.currentDocument);
    const submitButton = useRef(null);

    const [snackbar,setSnackbar] = useState(false);

    /**
     Submits the "Create New Document" form.
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = true;	// Disable the submit button to prevent multiple requests being sent
        }
        createDocument({
            url: "/documents",
            method: "post",
            data: {
                name: form.name,
                description: form.description,
                forest: []
            }
        })
        setSnackbar(true);  // NOTE: This is set whether there was an error or not.
                            // Do not set state variables in the main body of the component, it creates an infinite loop.
        setRedirect(true);
    };

    //////////////////////
    // TODO: Use the same approach as in RegisterContainer, dispatching sendServerRequest and having this component
    // respond to its success or failure.
    //////////////////////

    const updateField = (e: any) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /**
        This block runs each time the component renders, and controls whether to redirect.
     */
    if (props.error) {
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = false;  // Reenable the submit button so the user can try again
        }
    } else {
        if (redirect && props.currentDocument && (!prevDocument || props.currentDocument.id !== prevDocument.id)) {
            return <Redirect to={{ pathname: `/documents/${props.currentDocument.id}` }} />;
        }
    }

    return (
        <div>
            <SnackbarComponent state={snackbar} onClose={()=>setSnackbar(false)} severity="success" displayText="Document created!"/>
            <Card className="mx-auto" id="new-document-form">
                <Card.Body className="p-5 text-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" name="name" placeholder="Document Name" required
                                   value={form.name} onChange={updateField}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="textarea" rows={6} name="description" placeholder="Document Description"
                                      value={form.description} onChange={updateField}/>
                        </Form.Group>
                        <Button type="submit" variant="primary" ref={submitButton} style={{"width":"230px"}}>
                            Create New Document
                            {props.loading && <Spinner animation="border" variant="light" size="sm" className="ml-3" />}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documentReducer.currentDocument,
    loading: state.documentReducer.loading,
    error: state.documentReducer.error
});

const mapDispatchToProps = (dispatch: any) => ({
    createDocument: (request: AxiosRequestConfig) => { return dispatch(createDocument(request)) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
