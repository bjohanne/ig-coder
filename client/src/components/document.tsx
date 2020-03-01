import './document.css'
import React, { useEffect } from "react"; // , useRef
import { connect } from "react-redux";
import { getDocument, saveDocumentRequest } from "../state/actions";
import EntryComponent from "./entry";
import Document from "../core/model/document";

interface IDocumentEditorProps {
    documents: Array<Document>,
	currentDocument: Document | null,
    getDocument: Function,
    saveDocumentRequest: Function,
    match: any
}

export function DocumentComponent(props: IDocumentEditorProps) {
    const {getDocument, match: {params: {id}}} = props;

    useEffect(() => {
		// There is no currentDocument, or the currentDocument is not the requested one
        if (!props.currentDocument || props.currentDocument.id !== Number(id)) { // Convert the match params ID from string to number
            getDocument(id);
        }
	}, [getDocument, id, props.currentDocument]);

    /*
    const save = () => {
        props.saveDocumentRequest(props.document);
    };
    */

    return (
        props.currentDocument &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{props.currentDocument.name}</h2>
                        <small className="text-muted">{props.currentDocument.description}</small>
                    </div>
					<EntryComponent document={props.currentDocument}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.reducer.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: any) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentComponent);
