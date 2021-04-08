import React, {useEffect, useState} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import pageTitles from "../../core/config/pageTitles";
import {Arg} from "../../core/model/enums";
import {Entry} from "../../core/model/entry";
import Document from "../../core/model/document";
import TreeComponent from "../editor/tree";
import EditorModal from "../editor/editorModal";
import {createRootNode, clearTree} from "../../state/model/actions";
import {setEntryIndex, setSaved} from "../../state/documents/actions";
import {openSnackbarWithData} from "../../state/ui/actions";
import StatementAccordion from "./components/statementAccordion";

type PathParamsType = {
    docid: string,
    entryid: string
}

interface IProps extends RouteComponentProps<PathParamsType> {
    currentDocument: Document | null,
    loading: Boolean,
    createRootNode: Function,
    clearTree: Function,
    setSaved: Function,
    openSnackbarWithData: Function,
    setEntryIndex: Function
}

export function ViewEntryComponent(props: IProps) {
    // Set page title
    document.title = pageTitles.prefix + "Entry";

    const {
        match: {params: {docid, entryid}},
        currentDocument,
        loading,
        createRootNode,
        clearTree,
        setSaved,
        openSnackbarWithData,
        setEntryIndex
    } = props;

    // The current entry extracted from currentDocument
    const currentEntry: Entry = currentDocument.entries[currentDocument.entryMap[entryid]];

    // Base modal for node editors
    const [modalState, setModalState] = useState(false);
    const handleCloseModal = () => setModalState(false);
    const handleShowModal = () => setModalState(true);

    useEffect(() => {
        setEntryIndex(currentDocument.entryMap[Number(entryid)]);
    }, [setEntryIndex, currentDocument, entryid]);

    const handleCreateRootRegulative = () => {
        createRootNode(currentDocument.entryMap[entryid], Arg.regulative);
    };

    const handleCreateRootConstitutive = () => {
        createRootNode(currentDocument.entryMap[entryid], Arg.constitutive);
    };

    const handleClearTree = () => {
        if (!window.confirm("The entire tree for this entry will be deleted. Proceed?")) {
            return;
        }
        clearTree(currentDocument.entryMap[entryid]);
    };

    const handleSave = () => {
        // This doesn't actually save anything, because work is saved automatically in the browser.
        // It's implemented for users who feel they need to click a save button.
        setSaved();
        openSnackbarWithData("success", "Your changes have been saved locally.", 3000);
    }

    return (
        loading ?
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status" />
        </div>
        :
        ((currentDocument && currentEntry) ?
        <>
            <div className="card">
                <Breadcrumb>
                    <Link to="/" className="breadcrumb-item">Home</Link>
                    <Link to={"/documents/" + docid} className="breadcrumb-item">{currentDocument.name}</Link>
                    <li className="breadcrumb-item active">Entry {currentDocument.entryMap[entryid]+1}</li>
                </Breadcrumb>

                <div className="card-body">
                    <StatementAccordion currentEntry={currentEntry}/>

                    {currentEntry.root ?                /* The Entry has a root node */
                    <>
                        <TreeComponent showModal={handleShowModal} currentEntry={currentEntry}/>
                    </>
                    :                                   /* The Entry does not have a root node */
                    <Row className="py-2">
                        <Col className="d-flex align-items-center">
                            <small className="mr-2">Statement type:</small>
                            <ButtonGroup>
                                <Button onClick={handleCreateRootRegulative}>Regulative</Button>
                                <Button onClick={handleCreateRootConstitutive}>Constitutive</Button>
                            </ButtonGroup>
                        </Col>

                    </Row>
                    }
                    {currentEntry.root &&
                    <Row className="pt-2">
                        <Col className="d-flex justify-content-start">
                            <Button onClick={handleClearTree} variant="danger">Clear tree</Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button onClick={handleSave} variant="primary">Save changes</Button>
                        </Col>
                    </Row>
                    }
                </div>
            </div>

            {/* Editor base modal */}
            <EditorModal modalState={modalState} closeModal={handleCloseModal} currentEntry={currentEntry} />
        </>
        :
        <Redirect to="/404"/>
        )
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument,
    loading: state.documents.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    setEntryIndex: (entryIndex: number) => dispatch(setEntryIndex(entryIndex)),
    createRootNode: (entryIndex: number, nodeType: Arg.regulative | Arg.constitutive | Arg.statementjunction) =>
        dispatch(createRootNode(entryIndex, nodeType)),
    clearTree: (entryIndex: number) => dispatch(clearTree(entryIndex)),
    setSaved: () => dispatch(setSaved()),
    openSnackbarWithData: (color: string, message: string, duration: number) =>
        dispatch(openSnackbarWithData(color, message, duration))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewEntryComponent));
