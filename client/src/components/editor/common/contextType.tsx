import React, {useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {ContextType, contextTypeToNumArray, getContextStringAndIndent} from "../../../core/model/enums";
import {setContextType, unsetContextType} from "../../../state/model/actions";
import {INode} from "../../../core/model/interfaces";

interface IProps {
    activeNode: INode,
    currentEntryIndex: Number,
    setContextType: Function,
    unsetContextType: Function
}

const ContextTypeComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        setContextType,
        unsetContextType
    } = props;

    const [currentContextType, setCurrentContextType] = useState(activeNode.contextType);

    const handleChange = (e) => {
        setCurrentContextType(e.currentTarget.value);
    }

    const handleSave = () => {
        if (Number(currentContextType) === -1) { // Need to convert to number in case the value is "-1" (string)
            unsetContextType(currentEntryIndex, activeNode.id);
        } else {
            setContextType(currentEntryIndex, activeNode.id, currentContextType);
        }
    }

    return (
        <Form>
            <Form.Row title="Optionally label this node using the Context Taxonomy">
                <Col xs="auto" className="d-flex align-items-end">
                    <Form.Label htmlFor="contextTypeSelect">
                        Context type
                    </Form.Label>
                </Col>
                <Col xs="auto">
                    <Form.Control
                        as="select"
                        id="contextTypeSelect"
                        custom
                        defaultValue={(typeof currentContextType !== "undefined") ? currentContextType : -1}
                        onChange={handleChange} onBlur={handleSave} onMouseOut={handleSave}
                    >
                        <option value={-1} style={{fontStyle: "italic"}}>None</option>
                        {contextTypeToNumArray().map((val: number, i: number) =>
                            <option key={i} value={val}>{getContextStringAndIndent(val)}</option>
                        )}
                    </Form.Control>
                </Col>
            </Form.Row>
        </Form>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex
});

const mapDispatchToProps = (dispatch: any) => ({
    setContextType: (entryIndex: number, nodeId: number, contextType: ContextType) =>
        dispatch(setContextType(entryIndex, nodeId, contextType)),
    unsetContextType: (entryIndex: number, nodeId: number) => dispatch(unsetContextType(entryIndex, nodeId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextTypeComponent);
