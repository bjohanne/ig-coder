import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "../units/accordion";
//import NewEntryEditor from "./../editor/newEntry";
//import TreeComponent from "../editor/tree";

import {INode} from "../../core/model/interfaces";
import {getDocument, saveDocumentRequest} from "../../state/documents/actions";
import pageTitles from "../../core/config/pageTitles";

export function ViewDocumentComponent(props) {
    const {
        getDocument,
        match: {params: {id}},
        currentDocument,
        loading,
        saveDocumentRequest
    } = props;

    // Set page title
    if (currentDocument && currentDocument.name) {
        document.title = pageTitles.prefix + currentDocument.name;
    } else {
        document.title = pageTitles.prefix + "Document";
    }

    useEffect(() => {
		// There is no currentDocument, or the currentDocument is not the requested one
        if (!currentDocument || currentDocument.id !== Number(id)) { // Convert the match params ID from string to number
            getDocument(id);	// Fetch the document if it's not already in store
        }
	}, [currentDocument, id, getDocument]);


    const save = () => {
        saveDocumentRequest(currentDocument);
    };

    return (
        loading ?
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status" />
        </div>
        :
        (currentDocument ?
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{currentDocument.name}</h2>
                        <small className="text-muted">{currentDocument.description}</small>
                    </div>
                    <div className="col-md-6 text-right">
                        {/*<NewEntryEditor
                            toggle={(show: any) =>
                                <button type="button" className="btn btn-primary" onClick={show}>Create New Entry</button>
                            }
                            content={(hide: any) =>
                                <Accordion close={hide} id={currentDocument.id}/>
                            }
                        />*/}
                    </div>
                </div>

                <div className="card-body" id="node-100000">
                {(currentDocument.forest && currentDocument.forest.length &&
                currentDocument.forest.map((root: INode) => <div key={root.id}></div>)) // between divs: <TreeComponent node={root}/>
                ||
                <h4 className="text-center">No entries to display</h4>
                }
                </div>

                <div className="card-body" id="accordion-root"></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" style={{ textAlign: "left" }}>
                            <button type="button" className="btn btn-primary" onClick={save}>Save Document</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <p>Could not find the requested document.</p>)
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument,
    loading: state.documents.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: any) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewDocumentComponent));
