import React from "react";
import {connect} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {INode} from "../../../core/model/interfaces";
import {ComponentNode} from "../../../core/model/nodes";
import {ComponentType, NodeType} from "../../../core/model/enums";
import ViewChildNode from "../common/viewChildNode";

interface IProps {
    activeNode: ComponentNode,
    disabled: boolean
}

const ComponentChildren = (props: IProps) => {
    const {
        activeNode,
        disabled
    } = props;

    const children: INode[] = activeNode.children;

    const addChild = () => {    // Add new child node

    }

    const deleteChild = () => { // Delete child node

    }

    return (
        <>
            {[ComponentType.activationconditions, ComponentType.executionconstraints].includes(activeNode.componentType) ?
                <Row noGutters>
                    {children.map((node: INode, i: number) =>
                        <Col key={i} className="mr-2 mb-2" xs="auto">
                            <ViewChildNode node={node} childIndex={i} createSelf={() => {}} deleteSelf={deleteChild}/>
                        </Col>
                    )}
                    <Col xs="auto" className="ml-2">
                        <DropdownButton size="lg" title="Create" disabled={disabled}>
                            <Dropdown.Item data-type={NodeType.regulativestatement} disabled={disabled} onClick={addChild}>
                                Regulative Statement</Dropdown.Item>
                            <Dropdown.Item data-type={NodeType.constitutivestatement} disabled={disabled} onClick={addChild}>
                                Constitutive Statement</Dropdown.Item>
                            <Dropdown.Item data-type={NodeType.statementjunction} disabled={disabled} onClick={addChild}>
                                Statement Junction</Dropdown.Item>
                            <Dropdown.Item data-type={NodeType.componentjunction} disabled={disabled} onClick={addChild}>
                                Component Junction</Dropdown.Item>
                            <Dropdown.Item data-type={NodeType.component} disabled={disabled} onClick={addChild}>
                                Component (Simple Context)</Dropdown.Item> {/* SimpleContext only */}
                        </DropdownButton>
                    </Col>
                </Row>
                :
            (children.length === 0) ? // Node has no children
                [ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject,
                    ComponentType.constitutingproperties, ComponentType.constitutedentity].includes(activeNode.componentType) ?
                    <DropdownButton size="lg" title="Create" disabled={disabled}>
                        <Dropdown.Item data-type={NodeType.regulativestatement} disabled={disabled} onClick={addChild}>
                            Regulative Statement</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.constitutivestatement} disabled={disabled} onClick={addChild}>
                            Constitutive Statement</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.statementjunction} disabled={disabled} onClick={addChild}>
                            Statement Junction</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.componentjunction} disabled={disabled} onClick={addChild}>
                            Component Junction</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.propertyjunction} disabled={disabled} onClick={addChild}>
                            Property Junction</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.property} disabled={disabled} onClick={addChild}>
                            Property</Dropdown.Item>
                    </DropdownButton>
                :
                [ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) ?
                    <DropdownButton size="lg" title="Create" disabled={disabled}>
                        <Dropdown.Item data-type={NodeType.componentjunction} disabled={disabled} onClick={addChild}>
                            Component Junction</Dropdown.Item>
                    </DropdownButton>
                :
                    activeNode.componentType === ComponentType.orelse &&
                    <DropdownButton size="lg" title="Create" disabled={disabled}>
                        <Dropdown.Item data-type={NodeType.regulativestatement} disabled={disabled} onClick={addChild}>
                            Regulative Statement</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.constitutivestatement} disabled={disabled} onClick={addChild}>
                            Constitutive Statement</Dropdown.Item>
                        <Dropdown.Item data-type={NodeType.statementjunction} disabled={disabled} onClick={addChild}>
                            Statement Junction</Dropdown.Item>
                    </DropdownButton>
            :                       // Node has children
                <Row noGutters>
                    {children.map((node: INode, i: number) =>
                        <Col key={i} className="mr-2 mb-2" xs="auto">
                            <ViewChildNode node={node} childIndex={i} createSelf={() => {}} deleteSelf={deleteChild}/>
                        </Col>
                    )}
                    {[NodeType.property, NodeType.propertyjunction].includes(children[0].nodeType) &&
                        <Col xs="auto" className="ml-2">
                            <DropdownButton size="lg" title="Create" disabled={disabled}>
                                <Dropdown.Item data-type={NodeType.propertyjunction} disabled={disabled} onClick={addChild}>
                                    Property Junction</Dropdown.Item>
                                <Dropdown.Item data-type={NodeType.property} disabled={disabled} onClick={addChild}>
                                    Property</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    }
                </Row>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentChildren);

