import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDocument } from "../state/actions";
import Document from "../core/model/document";
import GraphComponent from "./graph";

export function NewEntryComponent(props: any) {
    const {getDocument, match: {params: {id}}} = props;

    const [doc, updateDoc] = useState(props.document);

    useEffect(() => {
        if (!props.document) {
            getDocument(id);
        }
        // After getting the Document, call Document.createTree() with Deontic.
        // The graph should update
    }, [getDocument, id, props.document]);

    const initialData = {
        "id": "1",
        "nodeType": "Root",
        "entry": {
            "content": ""
        }
    };

    return (
        props.document &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{props.document.name}</h2>
                        <small className="text-muted">{props.document.description}</small>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <GraphComponent data={initialData}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    document: state.reducer.document
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: any) => dispatch(getDocument(document_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEntryComponent);
