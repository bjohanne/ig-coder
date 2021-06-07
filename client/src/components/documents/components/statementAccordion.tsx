import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DOMPurify from "dompurify";
import {Entry} from "../../../core/model/entry";
import {AccordionToggle} from "../../common/accordionToggle";
import {setRephrased, unsetRephrased} from "../../../state/model/actions";
import "./statementAccordion.css";

interface IProps {
    currentEntry: Entry,
    currentEntryIndex: number,
    setRephrased: Function,
    unsetRephrased: Function
}

const StatementAccordion = (props: IProps) => {
    const {
        currentEntry,
        currentEntryIndex,
        setRephrased,
        unsetRephrased
    } = props;

    const rawTextArea = useRef(null);
    const rephrasedTextArea = useRef(null);
    const [rephrasedTextState, setRephrasedTextState] = useState<string>(currentEntry.rephrased);

    const hasRephrased: boolean = (currentEntry.rephrased !== "");

    useEffect(() => {
        if (rawTextArea.current && rephrasedTextArea.current) {
            // For the 2 textareas that display the statement, adapt the number of rows to the length of the statement
            rawTextArea.current.rows = 1;
            rephrasedTextArea.current.rows = 1;
            if (rawTextArea.current.scrollHeight > 36) {
                const newRowsNumber = ((rawTextArea.current.scrollHeight - 12) / 24);
                rawTextArea.current.rows = newRowsNumber;
                rephrasedTextArea.current.rows = newRowsNumber;
            }
        }
    }, []); // Run only once on mount

    const handleChangeRephrased = (e) => {
        setRephrasedTextState(e.currentTarget.value);   // Set local state
    }

    const handleClearRephrased = () => {
        setRephrasedTextState("");                // Set local state
        unsetRephrased(currentEntryIndex);                      // Set central state
    }

    const handleSaveRephrased = () => { // Input is sanitized upon saving
        let cleanRephrasedTextState: string = DOMPurify.sanitize(rephrasedTextState);
        setRephrasedTextState(cleanRephrasedTextState);   // Set local state
        setRephrased(currentEntryIndex, cleanRephrasedTextState);    // Set central state
    }

    return (
        <>
            {currentEntry ?
            <Form id="textarea-container">
                <Accordion defaultActiveKey="0">
                    <AccordionToggle text="Raw" openByDefault eventKey="0" title="The raw statement"/>
                    <Accordion.Collapse eventKey="0">
                        <Form.Group controlId="original-textarea" id="original-textarea">
                            <Form.Control as="textarea" ref={rawTextArea} disabled
                                          value={currentEntry.original}/>
                        </Form.Group>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion defaultActiveKey={hasRephrased ? "0" : null}>
                    <AccordionToggle text="Rephrased" openByDefault={hasRephrased}
                                     isLast eventKey="0" id="rephrased-toggle"
                     title="Optionally rephrase the raw statement and code that version instead. The rephrasing can be changed at any time."/>
                    <Accordion.Collapse eventKey="0">
                        <Form.Group controlId="rephrased-textarea" id="rephrased-textarea">
                            <InputGroup>
                                <Form.Control as="textarea" ref={rephrasedTextArea} value={rephrasedTextState}
                                              onChange={handleChangeRephrased}
                                              onBlur={handleSaveRephrased}
                                              onMouseOut={handleSaveRephrased}/>
                                <InputGroup.Append>
                                    <Button variant="warning" onClick={handleClearRephrased}>Clear</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Accordion.Collapse>
                </Accordion>
            </Form>
            :
            <Spinner animation="border" role="status" />
            }
        </>
    );
}

const mapStateToProps = (state: any) => ({
    currentDocument: state.documents.currentDocument,
    currentEntryIndex: state.documents.currentEntryIndex
});

const mapDispatchToProps = (dispatch: any) => ({
    setRephrased: (entryIndex: number, rephrased: string) => dispatch(setRephrased(entryIndex, rephrased)),
    unsetRephrased: (entryIndex: number) => dispatch(unsetRephrased(entryIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatementAccordion);
