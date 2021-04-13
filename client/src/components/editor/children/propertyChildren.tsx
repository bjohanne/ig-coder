import React from "react";
import {connect} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {INode} from "../../../core/model/interfaces";
import {NodeType} from "../../../core/model/enums";
import {PropertyNode} from "../../../core/model/nodes";
import ViewChildNode from "../common/viewChildNode";
import {addChildToProperty, deleteChildFromProperty} from "../../../state/model/actions";

interface IProps {
    activeNode: PropertyNode,
    currentEntryIndex: number,
    useCoreOnly: boolean,
    addChildToProperty: Function,
    deleteChildFromProperty: Function
}

const PropertyChildren = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        useCoreOnly,
        addChildToProperty,
        deleteChildFromProperty
    } = props;

    const children: INode[] = activeNode.children;

    const addChild = (e) => {    // Add new child node
        e.stopPropagation();
        addChildToProperty(currentEntryIndex, activeNode.id, e.target.dataset.type);
    }

    const deleteChild = (e) => { // Delete child node
        e.stopPropagation();
        deleteChildFromProperty(currentEntryIndex, activeNode.id);
    }

    return (
        <>
            {(children.length === 0) ?
                <DropdownButton size="lg" title="Create" disabled={useCoreOnly}>
                    <Dropdown.Item data-type={NodeType.regulativestatement} onClick={addChild}>Regulative Statement</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.constitutivestatement} onClick={addChild}>Constitutive Statement</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.statementjunction} onClick={addChild}>Statement Junction</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.propertyjunction} onClick={addChild}>Property Junction</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.property} onClick={addChild}>Property</Dropdown.Item>
                </DropdownButton>
            :
                <Row noGutters>
                    {children.map((node: INode, i: number) => // It can never have more than 1 child, but we're mapping to be safe
                        <Col key={i} className="mr-2 mb-2" xs="auto">
                            <ViewChildNode node={node} childIndex={i} createSelf={() => {}} deleteSelf={deleteChild}/>
                        </Col>
                    )}
                </Row>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex,
    useCoreOnly: state.appSettings.preferences.useCoreOnly
});

const mapDispatchToProps = (dispatch: any) => ({
    addChildToProperty: (entryIndex: number, parentId: number, childType: NodeType) =>
        dispatch(addChildToProperty(entryIndex, parentId, childType)),
    deleteChildFromProperty: (entryIndex: number, parentId: number) =>
        dispatch(deleteChildFromProperty(entryIndex, parentId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyChildren);

