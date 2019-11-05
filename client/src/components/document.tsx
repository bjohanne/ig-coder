import './document.css'
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getDocument, saveDocumentRequest} from "../state/actions";
import NewEntryComponent from "./editor/newEntry";
import Accordion from "./units/accordion";
import Document from "../core/model/document";


interface IDocumentEditorProps {
    document: Document,
    getDocument: Function,
    saveDocumentRequest: Function,
    match: any
}

export function DocumentComponent(props: IDocumentEditorProps) {  // Also export the unconnected component for testing
    // TODO: Update getDocument() params when new document is created?
    const {getDocument, match: {params: {id}}} = props;
    useEffect(() => getDocument(id), [getDocument, id]);

    const save = () => {
        props.saveDocumentRequest(props.document);
    };

    return (
        props.document &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <h2 className="card-title">{props.document.name}</h2>
                        <small className="text-muted">{props.document.description}</small>
                    </div>
                    <div className="col-md-8 text-right">
                        <NewEntryComponent
                            toggle={(show: any) => <button type="button" className="btn btn-success"
                                                           onClick={show}>Create New Entry</button>}
                            content={(hide: any) => (
                                <>
                                    <Accordion close={hide} documentId={props.document.id}/>

                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body" id="accordion-root">
                <button type="button" className="btn btn-success" onClick={save}>Save Document</button>
            </div>
            <div className="card-body">
                <h4 className="text-center">No entry available</h4>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    document: state.reducer.document,
    entries: state.reducer.entries
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: any) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentComponent);
