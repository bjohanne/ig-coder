import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {JunctionNode} from "../../../core/model/nodes";
import {INode} from "../../../core/model/interfaces";
import ViewChildNode from "../common/viewChildNode";
import {NodeType} from "../../../core/model/enums";
import {addChildToJunction, deleteChildFromJunction} from "../../../state/model/actions";

interface IProps {
    activeNode: JunctionNode,
    currentEntryIndex: number,
    addChildToJunction: Function,
    deleteChildFromJunction: Function
}

const JunctionChildren = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        addChildToJunction,
        deleteChildFromJunction
    } = props;

    const children: INode[] = activeNode.children;

    const createChild = (e) => { // Create fixed child node
        e.stopPropagation();
        addChildToJunction(currentEntryIndex, activeNode.id, e.target.dataset.type, e.target.dataset.index);
    }

    const deleteChild = (e) => { // Delete fixed child node
        e.stopPropagation();
        deleteChildFromJunction(currentEntryIndex, activeNode.id, e.target.dataset.index);
    }

    return (
        <Row noGutters>
            {children.map((node: INode, i: number) =>
                <Col key={i} className="mr-2 mb-2" xs="auto">
                    <ViewChildNode node={node} childIndex={i} parentJunctionNodeType={activeNode.nodeType}
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
    addChildToJunction: (entryIndex: number, parentId: number, childType: NodeType, childIndex: number) =>
        dispatch(addChildToJunction(entryIndex, parentId, childType, childIndex)),
    deleteChildFromJunction: (entryIndex: number, parentId: number, childIndex: number) =>
        dispatch(deleteChildFromJunction(entryIndex, parentId, childIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JunctionChildren);

