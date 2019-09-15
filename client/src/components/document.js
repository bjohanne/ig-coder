import './document.css'
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDocument } from "../state/actions";

function DocumentComponent(props) {
    // TODO: Update getDocument() params when new document is created?
    useEffect(() => props.getDocument(props.match.params.id), [props]);

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

const mapStateToProps = state => ({
  document: state.reducer.document
});

const mapDispatchToProps = dispatch => ({
  getDocument: (document_id) => dispatch(getDocument(document_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentComponent);
