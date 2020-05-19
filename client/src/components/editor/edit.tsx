import React from "react";
import { connect } from "react-redux";
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { NodeType } from "../../core/model/enums";
import EntryEditor from "./nodes/entryeditor";
import JunctionEditor from "./nodes/junctioneditor";
import ComponentEditor from "./nodes/componenteditor";

const Edit = (props: any) => {
    let activeNode = props.activeNode.node.data
    return (
        ((activeNode && [NodeType.convention, NodeType.norm].indexOf(activeNode.nodeType) > -1) && (<EntryEditor close={props.close}/>)) || 
        (activeNode.nodeType === NodeType.component && (<ComponentEditor/>)) 
        || (activeNode.nodeType === NodeType.junction && (<JunctionEditor/>)) 
        || <h2>No Entry</h2>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.reducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEntry: (node: INode) => dispatch(updateEntry(node)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edit);