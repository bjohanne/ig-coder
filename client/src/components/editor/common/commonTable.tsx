import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import NegatedComponent from "./negated";
import FunctionallyDependentComponent from "./functionallyDependent";
import ContextTypeComponent from "./contextType";
import JunctionTypeComponent from "./junctionType";
import PropertyTypeComponent from "./propertyType";
import HelpTextComponent from "./helpText";
import {INode} from "../../../core/model/interfaces";
import {NodeType} from "../../../core/model/enums";
import {ComponentNode} from "../../../core/model/nodes";

interface IProps extends React.HTMLProps<HTMLElement> {
    activeNode: INode
}

/**
 * This component is part of all node editors and encapsulates their unique components as well as the common
 * NegatedComponent, FunctionallyDependentComponent, ContextTypeComponent and HelpTextComponent.
 * Each child of this component is placed in its own row.
 */
const CommonEditorTable = (props: IProps) => {
    const {
        activeNode,
        children
    } = props;

    return (
        <>
        {activeNode ?
            <Row>
                <Col xs={8} md={9}>
                    <Row>
                        <Col xs={12} lg={"auto"} xl={"auto"} className="d-flex align-items-center pb-2">
                            <h4>{activeNode.nodeType}
                                {activeNode.nodeType &&
                                    activeNode.nodeType === NodeType.component &&
                                    ": " + (activeNode as ComponentNode).componentType}</h4>
                        </Col>
                        <Col xs={12} lg={5} xl={2} className="d-flex align-items-center pb-2">
                            <NegatedComponent/>
                        </Col>
                        {activeNode.nodeType && [NodeType.property, NodeType.propertyjunction]
                            .includes(activeNode.nodeType) &&
                            <Col xs={12} lg={7} xl={3} className="d-flex align-items-center pb-2">
                                <FunctionallyDependentComponent/>
                            </Col>
                        }
                        {activeNode.nodeType && [NodeType.property].includes(activeNode.nodeType) &&
                            <Col xs={12} lg={12} xl={4} className="d-flex align-items-center pb-2">
                                <PropertyTypeComponent/>
                            </Col>
                        }
                        {activeNode.nodeType && [NodeType.statementjunction, NodeType.componentjunction, NodeType.propertyjunction]
                            .includes(activeNode.nodeType) &&
                            <Col xs={12} lg={12} xl={3} className="d-flex align-items-center">
                                <JunctionTypeComponent/>
                            </Col>
                        }
                        {activeNode.nodeType && [NodeType.regulativestatement, NodeType.constitutivestatement,
                                                 NodeType.component, NodeType.property].includes(activeNode.nodeType) &&
                            <Col xs={12} lg={12} xl={4} className="d-flex align-items-center pb-2 down-1">
                                <ContextTypeComponent/>
                            </Col>
                        }

                        {React.Children.map(children, (child) => (
                            <Col xs={12}>
                                {child}
                            </Col>
                        ))}

                    </Row>
                </Col>
                <Col xs={4} md={3}>
                    <HelpTextComponent/>
                </Col>
            </Row>
        :
            <Spinner animation="border" role="status" />
        }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

export default connect(
    mapStateToProps,
    null
)(CommonEditorTable);

