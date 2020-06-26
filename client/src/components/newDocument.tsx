import React, {useState, useRef} from "react";
import {connect} from "react-redux";
import {withRouter, Redirect} from 'react-router-dom';
import {createDocument} from "../state/documents/actions";
import appConfig from "../core/config/appConfig";
import usePrevious from '../core/helpers/usePrevious';

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SnackbarComponent from "./common/snackbar";
import './newDocument.css';

export function NewDocumentComponent(props: any) {
    const {createDocument} = props;
    const [form, setValues] = useState({name: "", description: ""});
	const [redirect, setRedirect] = useState(false);	// Whether to redirect to the new document page
	const prevDocument = usePrevious(props.addedDocument);
    const buttonEl = useRef(null);

    const [snackbar,setSnackbar] = useState(false);

    /**
     Submits the "Create New Document" form.
     */
    const submitDocument = (event) => {
        event.preventDefault();
        setSnackbar(true);
        createDocument({name: form.name, description: form.description, forest: []});   // Here we want to chain a .then to do the redirect
		if (buttonEl && buttonEl.current) {
			buttonEl.current.disabled = true;	// Disable the submit button to prevent multiple requests being sent
		}
		setRedirect(true); // This is the trigger for redirecting
    };

    const updateField = (e: any) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

	if (redirect && props.addedDocument && (!prevDocument || props.addedDocument.id !== prevDocument.id)) {
       return <Redirect to={{ pathname: `${appConfig.client.path}/documents/${props.addedDocument.id}` }} />;
    }

    return (
        <div>
            <SnackbarComponent state={snackbar} onClose={()=>setSnackbar(false)} severity="success" displayText="Creating document..."/>
            <Card className="mx-auto" id="new-document-form">
                <Card.Body className="p-5 text-center">
                    <Form onSubmit={submitDocument}>
                        <Form.Group>
                            <Form.Control type="text" name="name" placeholder="Document Name" required
                                   value={form.name} onChange={updateField}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="textarea" rows={6} name="description" placeholder="Document Description"
                                      value={form.description} onChange={updateField}/>
                        </Form.Group>
                        <Button type="submit" variant="primary" ref={buttonEl}>Create New Document</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    addedDocument: state.documentReducer.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
    createDocument: (documentData: any) => dispatch(createDocument(documentData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
