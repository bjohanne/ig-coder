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
import {addChildToComponent, deleteChildFromComponent} from "../../../state/model/actions";

interface IProps {
    activeNode: ComponentNode,
    disabled: boolean,
    currentEntryIndex: number,
    useCoreOnly: boolean,
    addChildToComponent: Function,
    deleteChildFromComponent: Function
}

const ComponentChildren = (props: IProps) => {
    const {
        activeNode,
        disabled,
        currentEntryIndex,
        useCoreOnly,
        addChildToComponent,
        deleteChildFromComponent
    } = props;

    const children: INode[] = activeNode.children;

    const addChild = (e) => {    // Add new child node
        e.stopPropagation();
        addChildToComponent(currentEntryIndex, activeNode.id, e.target.dataset.type);
    }

    const deleteChild = (e) => { // Delete child node
        e.stopPropagation();
        deleteChildFromComponent(currentEntryIndex, activeNode.id, e.target.dataset.index);
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
                        <div title="Create a child node">
                            <DropdownButton size="lg" title="Create" disabled={disabled}>
                                {!useCoreOnly &&
                                <Dropdown.Item data-type={NodeType.regulativestatement} onClick={addChild}>
                                    Regulative Statement</Dropdown.Item>
                                }
                                {!useCoreOnly &&
                                <Dropdown.Item data-type={NodeType.constitutivestatement} onClick={addChild}>
                                    Constitutive Statement</Dropdown.Item>
                                }
                                {!useCoreOnly &&
                                <Dropdown.Item data-type={NodeType.statementjunction} onClick={addChild}>
                                    Statement Junction</Dropdown.Item>
                                }
                                {!useCoreOnly &&
                                <Dropdown.Item data-type={NodeType.componentjunction} onClick={addChild}>
                                    Component Junction</Dropdown.Item>
                                }
                                <Dropdown.Item data-type={NodeType.component} onClick={addChild}>
                                    Component (Simple Context)</Dropdown.Item> {/* SimpleContext only */}
                            </DropdownButton>
                        </div>
                    </Col>
                </Row>
                :
            (children.length === 0) ? // Node has no children
                [ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject,
                    ComponentType.constitutingproperties, ComponentType.constitutedentity].includes(activeNode.componentType) ?
                    <div title="Create a child node">
                        <DropdownButton size="lg" title="Create" disabled={disabled}>
                            {(!useCoreOnly && !activeNode.getText().isSet()) &&
                            <Dropdown.Item data-type={NodeType.regulativestatement} onClick={addChild}>
                                Regulative Statement</Dropdown.Item>
                            }
                            {(!useCoreOnly && !activeNode.getText().isSet()) &&
                            <Dropdown.Item data-type={NodeType.constitutivestatement} onClick={addChild}>
                                Constitutive Statement</Dropdown.Item>
                            }
                            {(!useCoreOnly && !activeNode.getText().isSet()) &&
                            <Dropdown.Item data-type={NodeType.statementjunction} onClick={addChild}>
                                Statement Junction</Dropdown.Item>
                            }
                            {(!useCoreOnly && !activeNode.getText().isSet()) &&
                            <Dropdown.Item data-type={NodeType.componentjunction} onClick={addChild}>
                                Component Junction</Dropdown.Item>
                            }
                            {!useCoreOnly &&
                            <Dropdown.Item data-type={NodeType.propertyjunction} onClick={addChild}>
                                Property Junction</Dropdown.Item>
                            }
                            <Dropdown.Item data-type={NodeType.property} onClick={addChild}>
                                Property</Dropdown.Item>
                        </DropdownButton>
                    </div>
                :
                [ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) ?
                    <>
                        <div title="Create a child node">
                            <DropdownButton size="lg" title="Create" disabled={disabled || useCoreOnly}>
                                <Dropdown.Item data-type={NodeType.componentjunction} disabled={disabled} onClick={addChild}>
                                    Component Junction</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {disabled &&
                            <small>Creating a child node is disabled because this node has text content.</small>
                        }
                    </>
                :
                    activeNode.componentType === ComponentType.orelse &&
                    <div title="Create a child node">
                        <DropdownButton size="lg" title="Create" disabled={disabled}>
                            <Dropdown.Item data-type={NodeType.regulativestatement} onClick={addChild}>
                                Regulative Statement</Dropdown.Item>
                            <Dropdown.Item data-type={NodeType.constitutivestatement} onClick={addChild}>
                                Constitutive Statement</Dropdown.Item>
                            {!useCoreOnly &&
                            <Dropdown.Item data-type={NodeType.statementjunction} onClick={addChild}>
                                Statement Junction</Dropdown.Item>
                            }
                        </DropdownButton>
                    </div>
            :                       // Node has children
                <Row noGutters>
                    {children.map((node: INode, i: number) =>
                        <Col key={i} className="mr-2 mb-2" xs="auto">
                            <ViewChildNode node={node} childIndex={i} createSelf={() => {}} deleteSelf={deleteChild}/>
                        </Col>
                    )}
                    {[NodeType.property, NodeType.propertyjunction].includes(children[0].nodeType) &&
                        <Col xs="auto" className="ml-2">
                            <div title="Create a child node">
                                <DropdownButton size="lg" title="Create" disabled={disabled}>
                                    {!useCoreOnly &&
                                    <Dropdown.Item data-type={NodeType.propertyjunction} onClick={addChild}>
                                        Property Junction</Dropdown.Item>
                                    }
                                    <Dropdown.Item data-type={NodeType.property} onClick={addChild}>
                                        Property</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Col>
                    }
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
    addChildToComponent: (entryIndex: number, parentId: number, childType: NodeType) =>
        dispatch(addChildToComponent(entryIndex, parentId, childType)),
    deleteChildFromComponent: (entryIndex: number, parentId: number, childIndex: number) =>
        dispatch(deleteChildFromComponent(entryIndex, parentId, childIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentChildren);

