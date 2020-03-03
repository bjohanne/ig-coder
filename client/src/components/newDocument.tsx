import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import {createDocument} from "../state/actions";
import appConfig from "../core/config/appConfig";
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import './newDocument.css'

/*
	The working document needs to be persistent between page refreshes, and simultaneously allow calling methods on it.
	Also, a change should not trigger a refresh since the Graph component takes care of updating the graph
	(as long as the working document is passed down to the Graph component).
*/

export function NewDocumentComponent(props: any) {
    const {createDocument} = props;
    const [form, setValues] = useState({name: "", description: ""});
	const [submitted, setSubmitted] = useState(false);	// Whether the form has been submitted
	const prevDocument = usePrevious(props.addedDocument);

	const buttonEl = useRef<HTMLButtonElement>(null);

    /**
     Submits the "Create New Document" form.
     If a document name is not provided,
     the form is not submitted.
     */
    const submitDocument = () => {
        if (form.name === "") {
			toast.error('Please enter a document name.');
		} else {
			toast.dismiss();
            createDocument({name: form.name, description: form.description, forest: "[]"});
			if (buttonEl && buttonEl.current) {	// Null check for TypeScript
				buttonEl.current.disabled = true;	// Disable the submit button to prevent multiple requests being sent
			}
			setSubmitted(true);	// This is the trigger for redirecting
        }
    };

    useEffect(() => {
		// The form has been submitted and a document has been set in state, and
		// either there is no previous document (first time) or the document has changed (subsequent times)
		if (submitted && props.addedDocument && (!prevDocument || props.addedDocument.id !== prevDocument.id)) {
			window.location.replace(`${appConfig.client.path}/documents/${props.addedDocument.id}`); // Redirect to document page
		}
    }, [prevDocument, submitted, props.addedDocument]);

    const updateField = (e: any) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="card mx-auto" id="new-document-form">
            <div className="card-body p-5 text-center">
                <div className="form-group">
                    <input type="text" className="form-control" name="name" placeholder="Document Name" required
                           value={form.name} onChange={updateField}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows={6} name="description" placeholder="Document Description"
                              value={form.description} onChange={updateField}/>
                </div>
                <button className="btn btn-primary" ref={buttonEl} onClick={submitDocument}>Create New Document</button>
            </div>
        </div>
    );
}

/*
Custom hook to get the previous value of a prop
*/
const usePrevious = <T extends {}>(prop: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = prop;
	});
	return ref.current;
};

const mapStateToProps = (state: any) => ({
    addedDocument: state.reducer.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
    createDocument: (documentData: any) => dispatch(createDocument(documentData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
