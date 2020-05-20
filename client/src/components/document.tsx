import './document.css'
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getDocument, saveDocumentRequest} from "../state/actions";
import NewEntryEditor from "./editor/newEntry";
import Accordion from "./units/accordion";
import Document from "../core/model/document";
import { INode } from "../core/model/interfaces";
import TreeComponent from "./editor/tree";

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
            getDocument(id);	// Fetch the document if it's not already in store
        }
	}, [getDocument, id, props.currentDocument]);

    
    const save = () => {
        props.saveDocumentRequest(props.currentDocument);
    };
    

    return (
        props.currentDocument &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{props.currentDocument.name}</h2>
                        <small className="text-muted">{props.currentDocument.description}</small>
                    </div>
                    <div className="col-md-6 text-right">                        
                        <NewEntryEditor
                            toggle={(show: any) => <button type="button" className="btn btn-primary"
                                                           onClick={show}>Create New Entry</button>}
                            content={(hide: any) => (
                                <>
                                    <Accordion close={hide} id={props.currentDocument.id}/>
                                </>
                            )}
                        />
                    </div>
                </div>

                <div className="card-body" id="node-100000">
                {(props.currentDocument.forest && props.currentDocument.forest.length &&
                props.currentDocument.forest.map((root: INode) => <div key={root.id}><TreeComponent node={root}/></div>)) 
                ||
                <h4 className="text-center">No entries to display</h4>
                }
            </div>

                <div className="card-body" id="accordion-root">
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" style={{ textAlign: "left" }}>
                            <button type="button" className="btn btn-primary" onClick={save}>Save Document</button>
                        </div>
                    </div>
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
