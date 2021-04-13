import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {setTextContent, unsetTextContent} from "../../../state/model/actions";
import {ITextContent} from "../../../core/model/interfaces";
import {Entry} from "../../../core/model/entry";
import {
    ComponentJunctionNode,
    ComponentNode,
    PropertyJunctionNode,
    PropertyNode,
    StatementJunctionNode
} from "../../../core/model/nodes";

interface IProps {
    activeNode: ComponentNode | PropertyNode | PropertyJunctionNode | ComponentJunctionNode | StatementJunctionNode,
    currentEntry: Entry,
    currentEntryIndex: number,
    disabled: boolean,
    setTextContent: Function,
    unsetTextContent: Function,
    usePrefixSuffix: Boolean
}

const TextContentComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntry,
        currentEntryIndex,
        disabled,
        setTextContent,
        unsetTextContent,
        usePrefixSuffix
    } = props;

    const statementTextArea = useRef(null);

    const [textState, setTextState] = useState<ITextContent>(activeNode.getText());

    useEffect(() => {
        if (statementTextArea.current) {
            // For the textarea that displays the statement, adapt the number of rows to the length of the statement
            statementTextArea.current.rows = 1;
            if (statementTextArea.current.scrollHeight > 36) {
                statementTextArea.current.rows = ((statementTextArea.current.scrollHeight - 12) / 24);
            }
        }
    }, []); // Run only once on mount

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTextState((prev) => ({ ...prev, [name]: value }));   // Set local state
    }

    const handleSaveText = () => {
        if (!disabled) {
            let trimmedTextState: ITextContent;
            if (usePrefixSuffix) {
                trimmedTextState = {
                    main: textState.main.trim(),
                    prefix: textState.prefix.trim(),
                    suffix: textState.suffix.trim(),
                    inferredOrRephrased: textState.inferredOrRephrased.trim(),
                };
            } else {    // Use prefix/suffix OFF: prefix and suffix are emptied when saving
                trimmedTextState = {
                    main: textState.main.trim(),
                    prefix: "",
                    suffix: "",
                    inferredOrRephrased: textState.inferredOrRephrased.trim(),
                };
            }
            setTextState(trimmedTextState);                                     // Set local state
            setTextContent(currentEntryIndex, activeNode.id, trimmedTextState); // Set app-wide state
        }
    }

    const handleClearText = () => {
        setTextState({                                     // Set local state
            main: "",
            prefix: "",
            suffix: "",
            inferredOrRephrased: ""
        });
        unsetTextContent(currentEntryIndex, activeNode.id);     // Set app-wide state
    }

    return (
        <Form id="textContentForm">
            <Row className="pb-3">
                <Col>                                                   {/* Use rephrased if set, otherwise original */}
                    <Form.Control as="textarea" ref={statementTextArea} id="statement-textarea" disabled
                                  value={currentEntry.rephrased !== "" ?
                                         currentEntry.rephrased : currentEntry.original}/>
                </Col>
            </Row>
            <Row xs={1} lg={3}>
                <Col>
                    {usePrefixSuffix &&
                        <Form.Group controlId="textContentForm.prefix">
                            <Form.Label column="sm">Prefix</Form.Label>
                            <Form.Control type="text" name="prefix" onChange={handleChange}
                                          onBlur={handleSaveText} onMouseOut={handleSaveText}
                                          value={textState.prefix} disabled={disabled} />
                        </Form.Group>
                    }
                </Col>
                <Col>
                    <Form.Group controlId="textContentForm.main">
                        <Form.Label column="sm">Main</Form.Label>
                        <Form.Control type="text" name="main" onChange={handleChange}
                                      onBlur={handleSaveText} onMouseOut={handleSaveText}
                                      value={textState.main} disabled={disabled} />
                    </Form.Group>
                </Col>
                <Col>
                    {usePrefixSuffix &&
                        <Form.Group controlId="textContentForm.suffix">
                            <Form.Label column="sm">Suffix</Form.Label>
                            <Form.Control type="text" name="suffix" onChange={handleChange}
                                          onBlur={handleSaveText} onMouseOut={handleSaveText}
                                          value={textState.suffix} disabled={disabled}/>
                        </Form.Group>
                    }
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={{ order: 'last', span: 12 }} lg={{ order: 'first', span: 4 }}
                     className="d-flex justify-content-start align-items-end pb-3">
                    <Button variant="warning" onClick={handleClearText} disabled={disabled}>Clear text content</Button>
                </Col>
                <Col xs={12} lg={4}>
                    <Form.Group controlId="textContentForm.inferredOrRephrased">
                        <Form.Label column="sm">Inferred/Rephrased</Form.Label>
                        <Form.Control type="text" name="inferredOrRephrased" onChange={handleChange}
                                      onBlur={handleSaveText} onMouseOut={handleSaveText}
                                      value={textState.inferredOrRephrased} disabled={disabled} />
                    </Form.Group>
                </Col>
                <Col xs={0} lg={4} className="pb-3">
                </Col>
            </Row>
        </Form>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex,
    usePrefixSuffix: state.appSettings.preferences.usePrefixSuffix
});

const mapDispatchToProps = (dispatch: any) => ({
    setTextContent: (entryIndex: number, nodeId: number, textContent: ITextContent) =>
        dispatch(setTextContent(entryIndex, nodeId, textContent)),
    unsetTextContent: (entryIndex: number, nodeId: number) => dispatch(unsetTextContent(entryIndex, nodeId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextContentComponent);

