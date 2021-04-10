import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {JunctionNode} from "../../../core/model/nodes";
import {INode} from "../../../core/model/interfaces";
import ViewChildNode from "../common/viewChildNode";

interface IProps {
    activeNode: JunctionNode
}

const JunctionChildren = (props: IProps) => {
    const {
        activeNode
    } = props;

    const children: INode[] = activeNode.children;

    const createChild = (e) => { // Create fixed child node
        console.log(e.target)
    }

    const deleteChild = () => { // Delete fixed child node

    }

    /*
        If creating a Component child: Grab the component type from this node.
        Except: if this is ActConds/ExeCstrts, the child gets SimpleContext.
    */

    return (
        <Row noGutters>
            {children.map((node: INode, i: number) =>
                <Col key={i} className="mr-2 mb-2" xs="auto">
                    <ViewChildNode node={node} childIndex={i} junctionNodeType={activeNode.nodeType}
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
)(JunctionChildren);

