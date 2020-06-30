import React, { useEffect } from "react";
import { connect } from "react-redux";
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/documents/actions";
import { NodeType } from "../../core/model/enums";
import EntryEditor from "./nodes/entryeditor";
import JunctionEditor from "./nodes/junctioneditor";
import ComponentEditor from "./nodes/componenteditor";
import SubComponentEditor from "./nodes/subcomponenteditor";
import NegationEditor from "./nodes/negationeditor";

const Edit = (props: any) => {
    let activeNode = props.activeNode.node.data

    useEffect((): void => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		activeNode = props.activeNode.node.data;
    }, [props.activeNode])

	if (activeNode && activeNode.nodeType) {
		switch(activeNode.nodeType) {
			case NodeType.norm:
            case NodeType.convention:
				return <EntryEditor close={props.close} created={props.activeNode.node.data.updatedAt}/>;
			case NodeType.junction:
                return <JunctionEditor close={props.close} created={props.activeNode.node.data.updatedAt}/>;
            case NodeType.subcomponent:
                return <SubComponentEditor close={props.close} created={props.activeNode.node.data.updatedAt}/>
			case NodeType.component:
                return <ComponentEditor close={props.close} created={props.activeNode.node.data.updatedAt}/>;
            case NodeType.negation:
                return <NegationEditor close={props.close} created={props.activeNode.node.data.updatedAt}/>;
			default:
				return <h2>No Entry</h2>;
		}
	}
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documentReducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEntry: (node: INode) => dispatch(updateEntry(node)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
