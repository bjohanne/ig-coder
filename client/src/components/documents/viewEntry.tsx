import React, {useEffect, useRef, useState} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import "./viewEntry.css";
import pageTitles from "../../core/config/pageTitles";
import {Arg} from "../../core/model/enums";
import {Entry} from "../../core/model/entry";
import TreeComponent from "../editor/tree";
import EditorModal from "../editor/editorModal";
import {createRootNode, clearTree} from "../../state/model/actions";
import {setSaved} from "../../state/documents/actions";
import {openSnackbarWithData} from "../../state/ui/actions";
import {AccordionToggle} from "../common/accordionToggle";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export function ViewEntryComponent(props) {
    // Set page title
    document.title = pageTitles.prefix + "Entry";

    const {
        match: {params: {docid, entryid}},
        currentDocument,
        loading,
        changed,
        createRootNode,
        clearTree,
        setSaved,
        openSnackbarWithData
    } = props;

    const currentEntry: Entry = currentDocument.entries[currentDocument.entryMap[entryid]];

    // Base modal for node editors
    const [modalState, setModalState] = useState(false);
    const handleCloseModal = () => setModalState(false);
    const handleShowModal = () => setModalState(true);

    const rawTextArea = useRef(null);
    const rephrasedTextArea = useRef(null);

    useEffect(() => {
        if (rawTextArea.current && rephrasedTextArea.current) {
            // For the 2 textareas that display the statement, adapt the number of rows to the length of the statement
            rawTextArea.current.rows = 1;
            rephrasedTextArea.current.rows = 1;
            if (rawTextArea.current.scrollHeight > 36) {
                const newRowsNumber = (rawTextArea.current.scrollHeight - 12) / 24;
                rawTextArea.current.rows = newRowsNumber;
                rephrasedTextArea.current.rows = newRowsNumber;
            }
        }
    }, []); // Run only once on mount

    const onRootRegulative = () => {
        createRootNode(currentDocument.entryMap[entryid], Arg.regulative);
    };

    const onRootConstitutive = () => {
        createRootNode(currentDocument.entryMap[entryid], Arg.constitutive);
    };

    const onClearTree = () => {
        if (!window.confirm("The entire tree for this entry will be deleted. Proceed?")) {
            return;
        }
        clearTree(currentDocument.entryMap[entryid]);
    };

    const onSave = () => {
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
                    <Form id="textarea-container">
                        <Accordion defaultActiveKey="0">
                            <AccordionToggle text="Raw" openByDefault eventKey="0"/>
                            <Accordion.Collapse eventKey="0">
                                <Form.Group controlId="original-textarea" id="original-textarea">
                                    <Form.Control as="textarea" ref={rawTextArea} disabled
                                                  value={currentEntry.original}/>
                                </Form.Group>
                            </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                            <AccordionToggle text="Rephrased" isLast eventKey="0" id="rephrased-toggle"/>
                            <Accordion.Collapse eventKey="0">
                                <Form.Group controlId="rephrased-textarea" id="rephrased-textarea">
                                    <Form.Control as="textarea" ref={rephrasedTextArea}/>
                                </Form.Group>
                            </Accordion.Collapse>
                        </Accordion>
                    </Form>

                    {currentEntry.root ?                /* The Entry has a root node */
                    <>
                        <TreeComponent showModal={handleShowModal} currentEntry={currentEntry}/>
                    </>
                    :                                   /* The Entry does not have a root node */
                    <Row className="py-2">
                        <Col className="d-flex align-items-center">
                            <small className="mr-2">Statement type:</small>
                            <ButtonGroup>
                                <Button onClick={onRootRegulative}>Regulative</Button>
                                <Button onClick={onRootConstitutive}>Constitutive</Button>
                            </ButtonGroup>
                        </Col>

                    </Row>
                    }
                    {currentEntry.root &&
                    <Row className="pt-2">
                        <Col className="d-flex justify-content-start">
                            <Button onClick={onClearTree} variant="danger">Clear tree</Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button onClick={onSave} variant="primary" disabled={!changed}>Save changes</Button>
                        </Col>
                    </Row>
                    }
                </div>
            </div>

            {/* Editor base modal */}
            <EditorModal modalState={modalState} closeModal={handleCloseModal} />
        </>
        :
        <Redirect to="/404"/>
        )
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument,
    loading: state.documents.loading,
    changed: state.documents.changed
});

const mapDispatchToProps = (dispatch: any) => ({
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
