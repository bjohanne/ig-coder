import React, {useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {JunctionType, junctionTypeToStringArray, getOperatorString} from "../../../core/model/enums";
import {setJunctionType} from "../../../state/model/actions";
import {ComponentJunctionNode, PropertyJunctionNode, StatementJunctionNode} from "../../../core/model/nodes";

interface IProps {
    activeNode: StatementJunctionNode | ComponentJunctionNode | PropertyJunctionNode,
    currentEntryIndex: Number,
    setJunctionType: Function
}

const JunctionTypeComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        setJunctionType
    } = props;

    const [currentJunctionType, setCurrentJunctionType] = useState(activeNode.junctionType);

    const handleChange = (e) => {
        setCurrentJunctionType(e.currentTarget.value);
    }

    const handleSave = () => {
        setJunctionType(currentEntryIndex, activeNode.id, currentJunctionType);
    }

    return (
        <Form className="pb-2">
            <Form.Row title="Set the logical operator that combines this node's two children">
                <Col xs="auto" className="d-flex align-items-end">
                    <Form.Label htmlFor="junctionTypeSelect">
                        Junction type
                    </Form.Label>
                </Col>
                <Col xs="auto">
                    <Form.Control
                        as="select"
                        id="junctionTypeSelect"
                        custom
                        defaultValue={currentJunctionType}
                        onChange={handleChange}
                        onBlur={handleSave}
                        onMouseOut={handleSave}
                    >
                        {/*<option value={JunctionType.none} style={{fontStyle: "italic"}}>None</option>*/}
                        {junctionTypeToStringArray().map((val: string, i: number) =>
                            <option key={i} value={val} title={getOperatorString(val)}>
                                {val}
                            </option>
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
    setJunctionType: (entryIndex: number, nodeId: number, junctionType: JunctionType) =>
        dispatch(setJunctionType(entryIndex, nodeId, junctionType))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JunctionTypeComponent);
