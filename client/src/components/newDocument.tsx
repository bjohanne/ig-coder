import React, {useState, useRef, useEffect} from "react";
import {connect} from "react-redux";
import {createDocument} from "../state/actions";
import appConfig from "../core/config/appConfig";
import {withRouter, Redirect, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import usePrevious from '../core/helpers/usePrevious';
import './newDocument.css';

export function NewDocumentComponent(props: any) {
    const {createDocument} = props;
    const [form, setValues] = useState({name: "", description: ""});
	const [redirect, setRedirect] = useState(false);	// Whether to redirect to the new document page
	const prevDocument = usePrevious(props.addedDocument);

	const buttonEl = useRef<HTMLButtonElement>(null);


    let history=useHistory()
    /**
     * judge whether a user is not logged in before mounting
     * redirect the link to homepage if not
     */
    useEffect(()=>{
        if(!props.loginState){
            history.push('/')
        }
    },[])

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
            createDocument({name: form.name, description: form.description, forest: []});
			if (buttonEl && buttonEl.current) {
				buttonEl.current.disabled = true;	// Disable the submit button to prevent multiple requests being sent
			}
			setRedirect(true); // This is the trigger for redirecting
        }
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
                <button type="button" className="btn btn-primary" ref={buttonEl} onClick={submitDocument}>Create New Document</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    addedDocument: state.reducer.currentDocument,
    loginState: state.reducer.loginState
});

const mapDispatchToProps = (dispatch: any) => ({
    createDocument: (documentData: any) => dispatch(createDocument(documentData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
