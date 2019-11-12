import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {addDocument} from "../state/actions";
import appConfig from "../core/config/appConfig";
import {withRouter} from 'react-router-dom';
import Document from "../core/model/document";

import './newDocument.css'

export function NewDocumentComponent(props: any) {
    /**
     Submits the "Create New Document" form.
     If the form is invalid (e.g. required fields not filled),
     the form is not submitted.
     */
    const [form, setValues] = useState({name: "", description: ""});

    const {addDocument} = props;
    const submitDocument = () => {
        if (form.name !== "" && form.description !== "") {
            const data: Document = new Document(form.name, form.description, 123);
            addDocument(data);
            // If we had time, we would initialize the Document first after getting
            // the server's response so that we could get the real ID
        }
        console.log(form)
    };

    useEffect(() => {
        if (props.addedDocument && props.addedDocument.id) { // A document has been set in state (not null)
            props.history.push(`${appConfig.client.path}/documents/${props.addedDocument.id}`);
        }
    });

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
                <button className="btn btn-primary" onClick={submitDocument}>Create New Document</button>

            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    addedDocument: state.reducer.document
});

const mapDispatchToProps = (dispatch: any) => ({
    addDocument: (documentData: any) => dispatch(addDocument(documentData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewDocumentComponent));
