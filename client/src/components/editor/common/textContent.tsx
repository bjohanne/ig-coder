import React, {useState} from "react";
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
import {NodeType} from "../../../core/model/enums";
import ViewStatementText from "./viewStatementText";

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

    const [textState, setTextState] = useState<ITextContent>(activeNode.getText());

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTextState((prev) => ({ ...prev, [name]: value }));   // Set local state
    }

    const handleSaveText = () => {
        if (!disabled) {
            let trimmedTextState: ITextContent = {
                main: textState.main.trim(),
                prefix: textState.prefix.trim(),
                suffix: textState.suffix.trim(),
                inferredOrRephrased: textState.inferredOrRephrased.trim(),
            };
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

    const isJunctionNode: boolean = [NodeType.statementjunction, NodeType.componentjunction, NodeType.propertyjunction]
        .includes(activeNode.nodeType);

    return (
        <Form id="textContentForm">
            <ViewStatementText currentEntry={currentEntry} className="pb-2"/>
            <Row>
                {isJunctionNode ?
                    <Col xs={{ order: 3, span: 12 }} lg={{ order: 'first', span: 4 }}
                         className="d-flex justify-content-start align-items-end pb-3">
                        <Button variant="warning" onClick={handleClearText} disabled={disabled}>Clear text content</Button>
                    </Col>
                    :
                    <Col xs={12} lg={4}>
                        {usePrefixSuffix &&
                        <Form.Group controlId="textContentForm.prefix">
                            <Form.Label column="sm">Prefix</Form.Label>
                            <Form.Control type="text" name="prefix" onChange={handleChange}
                                          onBlur={handleSaveText} onMouseOut={handleSaveText}
                                          value={textState.prefix} disabled={disabled} />
                        </Form.Group>
                        }
                    </Col>
                }
                <Col xs={12} lg={4}>
                    <Form.Group controlId="textContentForm.main">
                        <Form.Label column="sm">
                            {isJunctionNode ?
                                "Junction text"
                            :
                                "Main content"
                            }
                        </Form.Label>
                        <Form.Control type="text" name="main" onChange={handleChange}
                                      onBlur={handleSaveText} onMouseOut={handleSaveText}
                                      value={textState.main} disabled={disabled} />
                    </Form.Group>
                </Col>
                {isJunctionNode ?
                    <Col xs={0} lg={4} />
                    :
                    <Col xs={12} lg={4}>
                        {usePrefixSuffix &&
                        <Form.Group controlId="textContentForm.suffix">
                            <Form.Label column="sm">Suffix</Form.Label>
                            <Form.Control type="text" name="suffix" onChange={handleChange}
                                          onBlur={handleSaveText} onMouseOut={handleSaveText}
                                          value={textState.suffix} disabled={disabled} />
                        </Form.Group>
                        }
                    </Col>
                }
            </Row>
            {!isJunctionNode &&
                <Row className="justify-content-center">
                    <Col xs={{order: 3, span: 12}} lg={{order: 'first', span: 4}}
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
                    <Col xs={{order: 2, span: 12}} lg={4} className="pb-3 d-flex align-items-end">
                        {disabled &&
                        <small>NB: Text content is disabled because this node has a child node.</small>
                        }
                    </Col>
                </Row>
            }
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

