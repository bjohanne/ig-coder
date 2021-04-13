import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {INode} from "../../../core/model/interfaces";
import {ComponentNode, StatementNode} from "../../../core/model/nodes";
import {Arg, NodeType, getComponentStringByIndex} from "../../../core/model/enums";
import ViewChildNode from "../common/viewChildNode";
import {addChildToStatement, deleteChildFromStatement} from "../../../state/model/actions";

interface IProps {
    activeNode: StatementNode,
    currentEntryIndex: number,
    addChildToStatement: Function,
    deleteChildFromStatement: Function
}

const StatementChildren = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        addChildToStatement,
        deleteChildFromStatement
    } = props;

    const children: INode[] = activeNode.children;
    const statementType: Arg.regulative | Arg.constitutive =
        (activeNode.nodeType === NodeType.regulativestatement ? Arg.regulative : Arg.constitutive);

    const createChild = (e) => { // Create fixed child node
        e.stopPropagation();
        addChildToStatement(currentEntryIndex, activeNode.id, e.target.dataset.index);
    }

    const deleteChild = (e) => { // Delete fixed child node
        e.stopPropagation();
        deleteChildFromStatement(currentEntryIndex, activeNode.id, e.target.dataset.index);
    }

    return (
        <Row noGutters> {/* NB: Relies on the fixed indices of all children! */}
            {children.map((node: ComponentNode, i: number) =>
                //(node.isDummy() || componentTypeIsOptional(node.componentType)) && // Render only optional children
                <Col key={i} className="mr-2 mb-2" xs="auto">
                    <ViewChildNode node={node} childIndex={i} component={getComponentStringByIndex(statementType, i)}
                                   createSelf={createChild} deleteSelf={deleteChild}/>
                </Col>
            )}
        </Row>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex
});

const mapDispatchToProps = (dispatch: any) => ({
    addChildToStatement: (entryIndex: number, parentId: number, childIndex: number) =>
        dispatch(addChildToStatement(entryIndex, parentId, childIndex)),
    deleteChildFromStatement: (entryIndex: number, parentId: number, childIndex: number) =>
        dispatch(deleteChildFromStatement(entryIndex, parentId, childIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatementChildren);

