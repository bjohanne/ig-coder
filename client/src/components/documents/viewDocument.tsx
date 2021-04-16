import React, {useEffect} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Badge from "react-bootstrap/Badge";

import "./viewDocument.css";
import {getDocument, saveDocumentRequest} from "../../state/documents/actions";
import pageTitles from "../../core/config/pageTitles";
import {Entry} from "../../core/model/entry";
import DocumentActionBar from "./components/documentActionBar";

export function ViewDocumentComponent(props) {
    const {
        getDocument,
        match: {params: {id}},
        currentDocument,
        loading,
        inManagementMode
    } = props;

    // Set page title
    if (currentDocument && currentDocument.name) {
        document.title = pageTitles.prefix + currentDocument.name;
    } else {
        document.title = pageTitles.prefix + "Document";
    }

    useEffect(() => {
		// There is no currentDocument, or the currentDocument is not the requested one - but only when management mode is on
        if ((!currentDocument || currentDocument.id !== Number(id)) && inManagementMode) {
            getDocument(Number(id));	// Fetch the document if it's not already in store
        }
	}, [currentDocument, id, getDocument, inManagementMode]);

    const handleRowClicked = (e: React.MouseEvent<HTMLTableRowElement>) => {
        // The entry ID is stored in the data-id attribute of the row
        props.history.push("/documents/" + id + "/entries/" + e.currentTarget.dataset.id);
    }

    return (
        loading ?
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status" />
        </div>
        :
        (currentDocument ?
        <div className="card">
            <Breadcrumb listProps={{"className": "custom-breadcrumb"}}>
                <Link className="breadcrumb-item" to="/">Home</Link>
                <Breadcrumb.Item active>{currentDocument.name}</Breadcrumb.Item>
                <small title="Nevertheless, remember to save to file before quitting.">
                    Your work is saved automatically.
                </small>
            </Breadcrumb>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="card-title">{currentDocument.name}</h2>
                        {currentDocument.description &&
                        <p><small>{currentDocument.description}</small></p>
                        }
                    </div>
                    <div className="col-md-6 text-right">
                        <DocumentActionBar/>
                    </div>
                </div>

                {currentDocument.entries ?
                <Table striped bordered hover id="statements-table">
                    <colgroup>
                        <col id="number-col"/>
                        <col id="statement-col"/>
                        <col id="status-col"/>
                        <col id="actions-col"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th title="Entry number">#</th>
                        <th title="The raw statement for each entry">Institutional Statement</th>
                        <th id="status-head" title="Whether or not coding has been started for each entry">Status</th>
                        <th id="actions-head" title="Available actions for each entry">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentDocument.entries.map((entry: Entry) =>
                        <tr data-id={entry.id} key={entry.id} onClick={handleRowClicked}>
                            <td>{currentDocument.entryMap[entry.id]+1}</td>
                            <td><small>{entry.original}</small></td>
                            <td>
                                <span className="m-0 p-0 d-flex justify-content-center">
                                    {entry.root ?
                                        <Badge variant="info" title="A coding exists (it may or may not be complete)">
                                            Started
                                        </Badge>
                                    :
                                        <Badge variant="secondary" title="No coding exists yet">
                                            Not coded
                                        </Badge>
                                    }
                                </span>
                            </td>
                            <td>
                                <Link to={"/documents/" + id + "/entries/" + entry.id}>
                                    <Button size="sm" title="Code this statement">Code</Button>
                                </Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                :
                <h4 className="text-center">This document doesn't have any entries yet.</h4>
                }
            </div>
        </div>
        :
        <Redirect to="/404"/>
        )
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument,
    loading: state.documents.loading,
    inManagementMode: state.appSettings.mode.management
});

const mapDispatchToProps = (dispatch: any) => ({
    getDocument: (document_id: number) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewDocumentComponent));
