import React, {useEffect, useRef, useState} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./viewEntry.css";
import pageTitles from "../../core/config/pageTitles";
import {Entry} from "../../core/model/entry";
import TreeComponent from "../editor/tree";
import Edit from "../editor/edit";

export function ViewEntryComponent(props) {
    // Set page title
    document.title = pageTitles.prefix + "Entry";

    const {
        match: {params: {docid, entryid}},
        currentDocument,
        loading,
    } = props;

    const currentEntry: Entry = currentDocument.entries[currentDocument.entryMap[entryid]];

    const [modal, setModal] = useState(false);

    const rawTextArea = useRef(null);
    const rephrasedTextArea = useRef(null);

    useEffect(() => {
        if (rawTextArea.current && rephrasedTextArea.current) {
            // For the textareas that display the statement, adapt the number of rows to the length of the statement
            rawTextArea.current.rows = 1;
            rephrasedTextArea.current.rows = 1;
            if (rawTextArea.current.scrollHeight > 36) {
                const newRowsNumber = (rawTextArea.current.scrollHeight - 12) / 24;
                rawTextArea.current.rows = newRowsNumber;
                rephrasedTextArea.current.rows = newRowsNumber;
            }
        }
    }, []);

    const onSave = () => {
    };

    /* These 2 will dispatch an action to create the root node, updating currentDocument, triggering a rerender. */

    const onRootRegulative = () => {
    };

    const onRootConstitutive = () => {
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
                <Breadcrumb>
                    <Link to="/" className="breadcrumb-item">Home</Link>
                    <Link to={"/documents/" + docid} className="breadcrumb-item">{currentDocument.name}</Link>
                    <li className="breadcrumb-item active">Entry {currentDocument.entryMap[entryid]+1}</li>
                </Breadcrumb>

                <div className="card-body">
                    <Form>
                        <Form.Group controlId="original-textarea" id="original-textarea">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="raw-prepend">
                                        Raw
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="textarea" ref={rawTextArea} disabled value={currentEntry.original}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="rephrased-textarea" id="rephrased-textarea">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="rephrased-prepend">
                                        Rephrased
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="textarea" ref={rephrasedTextArea}/>
                            </InputGroup>
                        </Form.Group>
                    </Form>

                    {currentEntry.root ?                /* The Entry has a root node */
                    <div>
                        <TreeComponent togglefunc={() => {setModal(!modal)}} currentEntry={currentEntry}/>
                    </div>
                    :                                   /* The Entry does not have a root node */
                    <div>
                        <small className="mr-2">Statement type:</small>
                        <Button onClick={onRootRegulative} className="mr-2">Regulative</Button>
                        <Button onClick={onRootConstitutive}>Constitutive</Button>
                    </div>
                    }

                    {/*<div className="card-body" id="accordion-root"/>*/} {/* Presumably, the Accordion is rendered here
                                                                               (which is actually the Create New Entry form */}
                </div>
            </div>

            {/* Here is the editor base modal */}
            <Modal show={modal} onHide={() => setModal(false)} className="modal-open">
                <Edit close={() => setModal(!modal)} />
            </Modal>
        </>
        :
        <Redirect to="/404"/>
        )
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewEntryComponent));
