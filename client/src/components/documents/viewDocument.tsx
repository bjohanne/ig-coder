import React, {useEffect} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./viewDocument.css";
import {getDocument, saveDocumentRequest} from "../../state/documents/actions";
import pageTitles from "../../core/config/pageTitles";
import {Entry} from "../../core/model/entry";

export function ViewDocumentComponent(props) {
    const {
        getDocument,
        match: {params: {id}},
        currentDocument,
        loading,
        saveDocumentRequest,
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
            getDocument(id);	// Fetch the document if it's not already in store
        }
	}, [currentDocument, id, getDocument, inManagementMode]);


    const onSave = () => {
        saveDocumentRequest(currentDocument);
    };

    const onExportJSON = () => {
    }

    const onExportUIMACAS = () => {
    }

    const onExportShorthand = () => {
    }

    const onImport = () => {
    }

    const handleRowClicked = (e: React.MouseEvent<HTMLTableRowElement>) => {
        // The entry ID is stored in the data-id attribute of the row
        props.history.push("/documents/" + id + "/entries/" + e.currentTarget.getAttribute("data-id"));
    }

    return (
        loading ?
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status" />
        </div>
        :
        (currentDocument ?
        <div className="card">
            <Breadcrumb>
                <Link to="/" className="breadcrumb-item">Home</Link>
                <li className="breadcrumb-item active">{currentDocument.name}</li>
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
                        <DropdownButton id="export-dropdown" title="Export" className="d-inline-block">
                            <Dropdown.Item onClick={onExportJSON} title="Save the document to a file">
                                JSON
                            </Dropdown.Item>
                            <Dropdown.Item onClick={onExportUIMACAS} title="Save the document to a file">
                                UIMA CAS
                            </Dropdown.Item>
                            <Dropdown.Item onClick={onExportShorthand} title="Save the document to a file">
                                Shorthand
                            </Dropdown.Item>
                        </DropdownButton>
                        <Button onClick={onImport} title="Load document from JSON file" className="ml-3">
                            Import
                        </Button>
                        {inManagementMode &&
                        <Button onClick={onSave} className="ml-3">
                            Save Document
                        </Button>
                        }
                    </div>
                </div>

                {currentDocument.entries ?
                <Table striped bordered hover id="statements-table">
                    <colgroup>
                        <col id="number-col"/>
                        <col id="statement-col"/>
                        <col id="actions-col"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Institutional Statement</th>
                        <th id="actions-head">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentDocument.entries.map((entry: Entry) =>
                        <tr data-id={entry.id} key={entry.id} onClick={handleRowClicked}>
                            <td>{currentDocument.entryMap[entry.id]+1}</td>
                            <td><small>{entry.original}</small></td>
                            <td>
                                <Link to={"/documents/" + id + "/entries/" + entry.id}>
                                    <Button size="sm" title="Code this statement">Edit</Button>
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
    getDocument: (document_id: any) => dispatch(getDocument(document_id)),
    saveDocumentRequest: (document: any) => dispatch(saveDocumentRequest(document))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewDocumentComponent));
