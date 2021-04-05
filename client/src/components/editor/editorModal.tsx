import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";

import { INode } from "../../core/model/interfaces";
import { NodeType } from "../../core/model/enums";
import StatementEditor from "./nodes/statementEditor";
import JunctionEditor from "./nodes/junctionEditor";
import ComponentEditor from "./nodes/componentEditor";
import PropertyEditor from "./nodes/propertyEditor";
import {setSaved} from "../../state/documents/actions";
import {openSnackbarWithData} from "../../state/ui/actions";

interface IProps {
	activeNode: INode,
	modalState: Boolean,
	closeModal: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	setSaved: Function,
	openSnackbarWithData: Function
}

const EditorModal = (props: IProps) => {
	const {
		activeNode,
		modalState,
		closeModal,
		setSaved,
		openSnackbarWithData
	} = props;

	const onSave = (e) => {
		// Like the save button in ViewEntry, this doesn't actually save anything,
		// because work is saved automatically in the browser.
		// It's implemented for users who feel they need to click a save button.
		setSaved();
		closeModal(e);
		openSnackbarWithData("success", "Your changes have been saved locally.", 3000);
    }

	const renderEditor = () => {
		if (activeNode && activeNode.nodeType) {
			switch (activeNode.nodeType) {
				case NodeType.regulativestatement:
					return <StatementEditor/>;
				case NodeType.constitutivestatement:
					return <StatementEditor/>;
				case NodeType.statementjunction:
					return <JunctionEditor/>;
				case NodeType.componentjunction:
					return <JunctionEditor/>;
				case NodeType.propertyjunction:
					return <JunctionEditor/>;
				case NodeType.component:
					return <ComponentEditor/>;
				case NodeType.property:
					return <PropertyEditor/>;
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
			<ModalFooter className="d-flex justify-content-between">
				<Button variant="secondary" onClick={closeModal}>Cancel</Button>
				<Button variant="primary" id="save-button-bottom" onClick={onSave}>Save changes</Button>
			</ModalFooter>
		</Modal>
	);

}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
	setSaved: () => dispatch(setSaved()),
	openSnackbarWithData: (color: string, message: string, duration: number) =>
		dispatch(openSnackbarWithData(color, message, duration))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorModal);
