import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {INode} from "../../../core/model/interfaces";
import {ComponentNode, StatementNode} from "../../../core/model/nodes";
import {Arg, NodeType, getComponentStringByIndex, componentTypeIsOptional} from "../../../core/model/enums";
import ViewChildNode from "../common/viewChildNode";

interface IProps {
    activeNode: StatementNode
}

const StatementChildren = (props: IProps) => {
    const {
        activeNode
    } = props;

    const children: INode[] = activeNode.children;
    const statementType: Arg.regulative | Arg.constitutive =
        (activeNode.nodeType === NodeType.regulativestatement ? Arg.regulative : Arg.constitutive);

    const createChild = (e) => { // Create fixed child node
        console.log(e.target.dataset.index);
    }

    const deleteChild = () => { // Delete fixed child node

    }

    return (
        <Row noGutters> {/* Render only optional children. NB: Relies on the fixed indices of all children! */}
            {children.map((node: ComponentNode, i: number) =>
                (node.isDummy() || componentTypeIsOptional(node.componentType)) &&
                <Col key={i} className="mr-2 mb-2" xs="auto">
                    <ViewChildNode node={node} childIndex={i} component={getComponentStringByIndex(statementType, i)}
                                   createSelf={createChild} deleteSelf={deleteChild}/>
                </Col>
            )}
        </Row>
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
)(StatementChildren);

