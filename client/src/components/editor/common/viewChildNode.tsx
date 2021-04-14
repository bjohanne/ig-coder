import React from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {INode} from "../../../core/model/interfaces";
import {NodeType, ComponentType, DefaultContext, componentTypeIsOptional} from "../../../core/model/enums";
import {ComponentNode} from "../../../core/model/nodes";
import {setActiveNode} from "../../../state/documents/actions";

interface IProps {
    node: INode,
    childIndex: number,    // Used by Statement and Junction parents, and sometimes by Component ones
    component?: string,     // Used by Statement parents - component type for printing
    parentJunctionNodeType?: NodeType,    // Used by Junction parents to determine what children can be created
    useCoreOnly: boolean,
    createSelf: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void, // Create fixed child (not add new)
    deleteSelf: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    setActiveNode: Function
}

const ViewChildNode = (props: IProps) => {
    const {
        node,
        childIndex,
        component,
        parentJunctionNodeType,
        useCoreOnly,
        createSelf,
        deleteSelf,
        setActiveNode
    } = props;

    /*
     * NB: All functions connected to buttons inside the card must call event.stopPropagation() to prevent
     * this function from running in addition to them.
     */
    const handleClickCard = () => {
        if (!node.isDummy()) {
            setActiveNode(node);    // Click a child node's card to go to that node's modal
        }
    }

    const isDefaultSimpleContext = (node.nodeType === NodeType.component &&
        (node as ComponentNode).componentType === ComponentType.simplecontext &&
            ((node as ComponentNode).getText().getString() === DefaultContext.activationconditions ||
                (node as ComponentNode).getText().getString() === DefaultContext.executionconstraints));

    return (
        <Card className={node.isDummy() ? "node-card-empty": "node-card"} onClick={handleClickCard}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center pt-2">
                    {component ?
                        (!node.isDummy() ? component : <span className="node-title-empty">{component}</span>) :
                        (!node.isDummy() ?
                            (node.nodeType === NodeType.component ?
                                "Component: " + (node as ComponentNode).componentType :
                                node.nodeType) :
                                    <em className="node-title-empty">Empty</em>
                        )
                    }
                </Card.Title>
                {(node.isDummy() && !parentJunctionNodeType) ?    // parentJunctionNodeType is only set if the parent is Junction
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
                    <Col className="d-flex justify-content-center pb-2">
                        {!node.isDummy() ?  // Node is NOT a dummy
                            (!component || componentTypeIsOptional((node as ComponentNode).componentType)) && // Disable deletion of fixed components
                            <Button data-index={childIndex} variant="warning" onClick={deleteSelf}
                                    disabled={isDefaultSimpleContext}>
                                Delete
                            </Button>
                            :   // Node is a dummy
                            parentJunctionNodeType === NodeType.statementjunction ?
                                <DropdownButton title="Create">
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.regulativestatement} onClick={createSelf}>
                                        Regulative Statement</Dropdown.Item>
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.constitutivestatement} onClick={createSelf}>
                                        Constitutive Statement</Dropdown.Item>
                                    <Dropdown.Item data-index={childIndex} data-type={NodeType.statementjunction} onClick={createSelf}>
                                        Statement Junction</Dropdown.Item>
                                </DropdownButton>
                                :
                                parentJunctionNodeType === NodeType.componentjunction ?
                                    <DropdownButton title="Create">
                                        {!useCoreOnly &&
                                        <Dropdown.Item data-index={childIndex} data-type={NodeType.componentjunction} onClick={createSelf}>
                                            Component Junction</Dropdown.Item>
                                        }
                                        <Dropdown.Item data-index={childIndex} data-type={NodeType.component} onClick={createSelf}>
                                            Component</Dropdown.Item> {/* Creating this node uses the parent's component type automatically */}
                                    </DropdownButton>
                                    :
                                    parentJunctionNodeType === NodeType.propertyjunction ?
                                        <DropdownButton title="Create">
                                            {!useCoreOnly &&
                                            <Dropdown.Item data-index={childIndex} data-type={NodeType.propertyjunction}
                                                           onClick={createSelf}>Property Junction</Dropdown.Item>
                                            }
                                            <Dropdown.Item data-index={childIndex} data-type={NodeType.property} onClick={createSelf}>
                                                Property</Dropdown.Item>
                                        </DropdownButton>
                                        :   // No parentJunctionNodeType is set, it's a non-Junction fixed child
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

const mapStateToProps = (state: any) => ({
    useCoreOnly: state.appSettings.preferences.useCoreOnly
});

const mapDispatchToProps = (dispatch: any) => ({
    setActiveNode: (node: INode) => dispatch(setActiveNode(node))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewChildNode);
