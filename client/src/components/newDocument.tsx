import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import {sendServerRequest, processBegin, processSuccess, processError} from "../state/apiRequest/actions";
import {createDocumentResponse} from "../state/documents/actions";
import usePrevious from '../core/helpers/usePrevious';
import './newDocument.css';

export function NewDocumentComponent(props: any) {
    const {
        processBegin,
        processSuccess,
        processError,
        sendServerRequest,
        createDocumentResponse,
        currentDocument
    } = props;
    const [form, setValues] = useState({name: "", description: ""});
    const [redirect, setRedirect] = useState(false);
	const prevDocument = usePrevious(currentDocument);
    const submitButton = useRef(null);

    /**
     Submits the "Create New Document" form.
     If a document name is not provided,
     the form is not submitted.
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (submitButton && submitButton.current) {
            submitButton.current.disabled = true;	// Disable the submit button to prevent multiple requests being sent
        }
        processBegin();
        sendServerRequest({
            url: "/documents",
            method: "post",
            data: {
                name: form.name,
                description: form.description,
                forest: []
            }
        })
        .then((response: AxiosResponse) => {
            setRedirect(true);
            createDocumentResponse(response.data);
            processSuccess();
        }, (error: AxiosError) => {
            processError(error);
            setRedirect(false);
            if (submitButton && submitButton.current) {
                submitButton.current.disabled = false;  // Reenable the submit button so the user can try again
            }
        });
    };

    const updateField = (e: any) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /**
        This block runs each time the component renders, and controls whether to redirect.
     */
    if (redirect && currentDocument && (!prevDocument || currentDocument.id !== prevDocument.id)) {
        return <Redirect to={{ pathname: `/documents/${currentDocument.id}` }} />;
    }

    return (
        <div>
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
    processBegin: () => dispatch(processBegin()),
    processSuccess: () => dispatch(processSuccess()),
    processError: (error: any) => dispatch(processError(error)),
    sendServerRequest: (request: AxiosRequestConfig) => { return dispatch(sendServerRequest(request)) },
    createDocumentResponse: (response) => dispatch(createDocumentResponse(response))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
