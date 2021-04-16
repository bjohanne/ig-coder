import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";

import {INode} from "../../core/model/interfaces";
import {NodeType} from "../../core/model/enums";
import {Entry} from "../../core/model/entry";
import StatementEditor from "./nodes/statementEditor";
import JunctionEditor from "./nodes/junctionEditor";
import ComponentEditor from "./nodes/componentEditor";
import PropertyEditor from "./nodes/propertyEditor";
import {openSnackbarWithData} from "../../state/ui/actions";

interface IProps {
	activeNode: INode,
	modalState: Boolean,
	currentEntry: Entry,
	closeModal: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const EditorModal = (props: IProps) => {
	const {
		activeNode,
		modalState,
		currentEntry,
		closeModal
	} = props;

	const renderEditor = () => {	// Node types receive currentEntry to display the statement text
		if (activeNode && activeNode.nodeType) {
			switch (activeNode.nodeType) {
				case NodeType.regulativestatement:
					return <StatementEditor currentEntry={currentEntry}/>;
				case NodeType.constitutivestatement:
					return <StatementEditor currentEntry={currentEntry}/>;
				case NodeType.statementjunction:
					return <JunctionEditor currentEntry={currentEntry}/>;
				case NodeType.componentjunction:
					return <JunctionEditor currentEntry={currentEntry}/>;
				case NodeType.propertyjunction:
					return <JunctionEditor currentEntry={currentEntry}/>;
				case NodeType.component:
					return <ComponentEditor currentEntry={currentEntry}/>;
				case NodeType.property:
					return <PropertyEditor currentEntry={currentEntry}/>;
				default:
					console.error("Invalid node type for active node: " + activeNode.nodeType);
					return <></>;
			}
		}
		return <Spinner animation="border" role="status" />;
	}

	return (
		<Modal show={modalState} onHide={closeModal}>
			<ModalBody>
				{renderEditor()}
			</ModalBody>
			<ModalFooter className="d-flex justify-content-start">
				<Button variant="secondary" onClick={closeModal}>Close</Button>
			</ModalFooter>
		</Modal>
	);

}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
	openSnackbarWithData: (color: string, message: string, duration: number) =>
		dispatch(openSnackbarWithData(color, message, duration))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorModal);
