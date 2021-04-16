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
import {setEntryIndex} from "../../state/documents/actions";
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

    const handleCreateRootStmtJunction = () => {
        createRootNode(currentDocument.entryMap[entryid], Arg.statementjunction);
    };

    const handleClearTree = () => {
        if (!window.confirm("The entire coding of this entry will be deleted. Proceed?")) {
            return;
        }
        clearTree(currentDocument.entryMap[entryid]);
    };

    return (
        loading ?
        <div className="h-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" role="status" />
        </div>
        :
        ((currentDocument && currentEntry) ?
        <>
            <div className="card">
                <Breadcrumb listProps={{"className": "custom-breadcrumb"}}>
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={"/documents/" + docid}>{currentDocument.name}</Link></li>
                    <Breadcrumb.Item active>Entry {currentDocument.entryMap[entryid]+1}</Breadcrumb.Item>
                    <small title="Nevertheless, remember to save to file before quitting.">
                        Your work is saved automatically.
                    </small>
                </Breadcrumb>

                <div className="card-body">
                    <StatementAccordion currentEntry={currentEntry}/>

                    {currentEntry.root ?                /* The Entry has a root node */
                    <>
                        <TreeComponent showModal={handleShowModal} currentEntry={currentEntry}/>
                    </>
                    :                                   /* The Entry does not have a root node */
                    <Row className="py-2">
                        <Col className="d-flex flex-column align-items-start">
                            <small className="mb-2">To start coding, choose a statement type.</small>
                            <ButtonGroup>
                                <Button onClick={handleCreateRootRegulative} title="The top-level statement is regulative">
                                    Regulative</Button>
                                <Button onClick={handleCreateRootConstitutive} title="The top-level statement is constitutive">
                                    Constitutive</Button>
                                <Button onClick={handleCreateRootStmtJunction}
                                        title="There are multiple, horizontally nested top-level statements. Example: Farmers may sell their goods AND farmers must pay taxes.">
                                    Statement combination</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    }

                    <Row className="pt-2">
                        {currentEntry.root &&
                        <Col className="d-flex justify-content-start">
                            <Button onClick={handleClearTree} variant="danger" title="Deletes the coding after a confirm prompt">
                                Clear tree
                            </Button>
                        </Col>
                        }
                    </Row>
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
    clearTree: (entryIndex: number) => dispatch(clearTree(entryIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewEntryComponent));
