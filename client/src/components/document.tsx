import './document.css'
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDocument } from "../state/actions";

export function DocumentComponent(props: any) {  // Also export the unconnected component for testing
    // TODO: Update getDocument() params when new document is created?
    const { getDocument, match: { params: { id }}} = props;
    useEffect(() => getDocument(id), [getDocument, id]);

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <h2 className="card-title">{props.document.name}</h2>
                        <small className="text-muted">{props.document.description}</small>
                    </div>
                    <div className="col-md-8 text-right">
                        <button type="button" className="btn btn-success">Create New Entry</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h4 className="text-center">No entry available</h4>
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
)(DocumentComponent);
