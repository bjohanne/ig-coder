import React, {useState} from "react";
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {PropertyNode} from "../../../core/model/nodes";
import {
    PropertyType,
    getPropertyTypeStringAndIndent,
    propertyTypeToStringArray,
} from "../../../core/model/enums";
import {setPropertyType} from "../../../state/model/actions";

interface IProps {
    activeNode: PropertyNode,
    currentEntryIndex: Number,
    setPropertyType: Function
}

const PropertyTypeComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        setPropertyType
    } = props;

    const [currentPropertyType, setCurrentPropertyType] = useState(activeNode.propertyType);

    const handleChange = (e) => {
        setCurrentPropertyType(e.currentTarget.value);
    }

    const handleSave = () => {
        setPropertyType(currentEntryIndex, activeNode.id, currentPropertyType);
    }

    return (
        <Form>
            <Form.Row title="Optionally label this property with a property type">
                <Col xs="auto" className="d-flex align-items-end">
                    <Form.Label htmlFor="propertyTypeSelect">
                        Property type
                    </Form.Label>
                </Col>
                <Col xs="auto">
                    <Form.Control
                        as="select"
                        id="propertyTypeSelect"
                        custom
                        defaultValue={currentPropertyType}
                        onChange={handleChange} onBlur={handleSave} onMouseOut={handleSave}
                    >
                        <option value={PropertyType.none} style={{fontStyle: "italic"}}>None</option>
                        {propertyTypeToStringArray().map((val: string, i: number) =>
                        val === PropertyType.qualitative ?
                            <option disabled key={i} value={val}>{getPropertyTypeStringAndIndent(val)}</option>
                        :
                            <option key={i} value={val}>{getPropertyTypeStringAndIndent(val)}</option>
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
    setPropertyType: (entryIndex: number, nodeId: number, propertyType: PropertyType) =>
        dispatch(setPropertyType(entryIndex, nodeId, propertyType))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyTypeComponent);
