import React from "react";
import { connect } from "react-redux";
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { NodeType } from "../../core/model/enums";
import EntryEditor from "./entryeditor";
import JunctionEditor from "./junctioneditor";
import ComponentEditor from "./componenteditor";

const Edit = (props: any) => {
    return (
        props.activeNode && [NodeType.convention, NodeType.norm].indexOf(props.activeNode.nodeType) > -1  &&
        (<EntryEditor close={props.close}/>) || (props.activeNode.nodeType === NodeType.component && (<ComponentEditor/>)) || (props.activeNode.nodeType === NodeType.junction && (<JunctionEditor/>)) || <h2>No Entry</h2>
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