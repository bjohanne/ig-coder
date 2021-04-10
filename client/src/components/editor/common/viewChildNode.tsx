import React from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {INode} from "../../../core/model/interfaces";
import {NodeType, ComponentType, DefaultContext} from "../../../core/model/enums";
import {ComponentNode} from "../../../core/model/nodes";

interface IProps {
    node: INode,
    childIndex?: number,    // Used by Statement and Junction parents, and sometimes by Component ones
    component?: string,     // Used by Statement parents - component type for printing
    junctionNodeType?: NodeType;    // Used by Junction parents
    createSelf: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void, // Create fixed child (not add new)
    deleteSelf: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const ViewChildNode = (props: IProps) => {
    const {
        node,
        childIndex,
        component,
        junctionNodeType,
        createSelf,
        deleteSelf
    } = props;

    const isDefaultSimpleContext = (node.nodeType === NodeType.component &&
        (node as ComponentNode).componentType === ComponentType.simplecontext &&
            ((node as ComponentNode).getText().getString() === DefaultContext.activationconditions ||
                (node as ComponentNode).getText().getString() === DefaultContext.executionconstraints));

    return (
        <Card style={{ width: "12rem", height: "11rem" }} className={node.isDummy() ? "node-card-empty": ""}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center">
                    {component ?
                        (!node.isDummy() ? component : <span className="node-title-empty">{component}</span>) :
                        (!node.isDummy() ?
                            (node.nodeType === NodeType.component ?
                                "Component: " + (node as ComponentNode).componentType :
                                node.nodeType) :
                                    <em className="node-title-empty">Empty slot</em>
                        )
                    }
                </Card.Title>
                {(node.isDummy() && !junctionNodeType) ?    // junctionNodeType is only set if the parent is Junction
                    <Card.Text className="text-center">
                        <em>Empty</em>
                    </Card.Text>
                :
                    isDefaultSimpleContext &&
                        <Card.Text className="text-center">
                            <em>Default</em>
                        </Card.Text>
                }
                <Row>
                    <Col className="d-flex justify-content-center">
                        {!node.isDummy() ?  // Node is NOT a dummy
                            <Button data-index={childIndex} variant="warning" onClick={deleteSelf}
                                    disabled={isDefaultSimpleContext}>
                                Delete
                            </Button>
                            :   // Node is a dummy
                            junctionNodeType === NodeType.statementjunction ?
                                <DropdownButton title="Create">
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.regulativestatement} onClick={createSelf}>
                                        Regulative Statement</Dropdown.Item>
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.constitutivestatement} onClick={createSelf}>
                                        Constitutive Statement</Dropdown.Item>
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.statementjunction} onClick={createSelf}>
                                        Statement Junction</Dropdown.Item>
                                </DropdownButton>
                                :
                                junctionNodeType === NodeType.componentjunction ?
                                    <DropdownButton title="Create">
                                        <Dropdown.Item data-index={childIndex} data-type={NodeType.componentjunction} onClick={createSelf}>
                                            Component Junction</Dropdown.Item>
                                        <Dropdown.Item data-index={childIndex} data-type={NodeType.component} onClick={createSelf}>
                                            Component</Dropdown.Item> {/* Creating this node uses the parent's component type automatically */}
                                    </DropdownButton>
                                    :
                                    junctionNodeType === NodeType.propertyjunction ?
                                        <DropdownButton title="Create">
                                            <Dropdown.Item data-index={childIndex} data-type={NodeType.propertyjunction} onClick={createSelf}>
                                                Property Junction</Dropdown.Item>
                                            <Dropdown.Item data-index={childIndex} data-type={NodeType.property} onClick={createSelf}>
                                                Property</Dropdown.Item>
                                        </DropdownButton>
                                        :   // No junctionNodeType is set, it's a fixed child
                            <Button data-index={childIndex} variant="primary" onClick={createSelf}>
                                Create
                            </Button>
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default connect(
    null,
    null
)(ViewChildNode);
