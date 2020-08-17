import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Toggle from "react-toggle";
import { INode } from "../../../core/model/interfaces";
import { updateEntry } from "../../../state/documents/actions";
import { buildEntrySubTree } from "../../../core/model/builder";
//import Chevron from "../../units/chevron";
import { NodeType, ComponentType, SubcomponentType, SubtreeType } from "../../../core/model/enums";
import { ComponentNode } from "../../../core/model/nodes/";

/*
	This is the Editor component for Norm and Convention nodes (entries).
	This editor is divided into various UI components that can be expanded and collapsed.
	They are here referred to as UI elements.
	props.activeNode holds the complete D3 node with references to its parent and children.
*/

const EntryEditor = (props: any) => {
	// State variables for expanding and collapsing the various UI elements
    const [collapse, setCollapse] = useState({ collapseTop: true, collapseBottom: true, collapseObjects: false, collapseConditions: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [atoms, setAtoms] = useState({ Attributes: null, Deontics: null, Aim: null, DirectObject: null, IndirectObject: null })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [conditions, setConditions] = useState({ ActivationCondition: null, ExecutionCondition: null });
    const [entryText, setEntryText] = useState("")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateAtoms = (e: any) => {
        setAtoms({
          ...atoms,
          [e.target.name]: e.target.value
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateConditions = (e: any) => {
        setConditions({
            ...conditions,
            [e.target.name]: e.target.value
        });
    };

    const saveEntryData = () => {
        try {
            props.activeNode.node.data.entry.content = entryText;
            buildEntrySubTree(props.activeNode.node.data, atoms, conditions, props.updateEntry);
            props.close();
        } catch(error) {
            alert(error);
        }
    }

	/* Functions to get the initial status for Negation and Sanction */

	const getIsNegated = () : boolean => {
		// Check if parent is of type Negation
		let parent = (props.activeNode && props.activeNode.node.parent);
		return (parent && parent.data.nodeType === NodeType.negation);
	}

	const getHasObject = () : boolean => {
		// Check if this node has an Object child
		let activeNode = (props.activeNode && props.activeNode.node.data);
		return (activeNode.children && typeof activeNode.children[1].nodeType !== "undefined");
	}

	const getHasSanction = () : boolean => {
		// Check if parent's subtree is of type Sanction
		let parent = (props.activeNode && props.activeNode.node.parent);
		return (parent && parent.data.subtree === SubtreeType.sanction);
	}

	// State variables for Negation and Sanction status
	const [isNegated, setIsNegated] = useState(getIsNegated());
	const [hasObject, setHasObject] = useState(getHasObject());
	const [hasSanction, setHasSanction] = useState(getHasSanction());

	const changeIsNegated = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsNegated(e.target.checked);
	}

	const changeHasObject = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHasObject(e.target.checked);
	}

	const changeHasSanction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasSanction(e.target.checked);
    }

	// State variables for Chevron rotation (points to the right by default)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rotateTop, setRotateStateTop] = useState("accordion__icon rotate");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rotateBottom, setRotateStateBottom] = useState("accordion__icon rotate-up");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rotateObjects, setRotateStateObjects] = useState("accordion__icon");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rotateConditions, setRotateStateConditions] = useState("accordion__icon");

	// State variables for whether each element is active
    const [activeTop, setActiveState] = useState(false);
    const [activeBottom, setActiveStateBottom] = useState(false);
    const [activeObjects, setActiveStateObjects] = useState(false);
    const [activeConditions, setActiveStateConditions] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const toggleAccordion = (accordion: string, collapseValue: boolean) => {
        if (accordion === "collapseTop") {
            setActiveState(!activeTop);
            setRotateStateTop(activeTop ? "accordion__icon rotate" : "accordion__icon");
        } else if (accordion === "collapseBottom") {
            setActiveStateBottom(!activeBottom);
            setRotateStateBottom(activeBottom ? "accordion__icon rotate-up" : "accordion__icon rotate-down");
        } else if (accordion === "collapseObjects") {
            setActiveStateObjects(!activeObjects);
            setRotateStateObjects(activeObjects ? "accordion__icon" : "accordion__icon rotate");
        } else if (accordion === "collapseConditions") {
            setActiveStateConditions(!activeConditions);
            setRotateStateConditions(activeConditions ? "accordion__icon" : "accordion__icon rotate");
        }
        setCollapse({
            ...collapse,
            [accordion]: !collapseValue
        });
    }

	/* Functions to get the current value of this node's component children */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getValue = (type: ComponentType) : string => {
        if (props.activeNode.node.data.activeNode && props.activeNode.node.data.children) {
			// Find out whether this node has a child of the passed in type
            let node = props.activeNode.node.data.children.find((node: INode) => {
                if (node.nodeType === NodeType.component) {
                    return (node as ComponentNode).componentType === type;
                }
                return false;
            });
            if (node && node.component.content)
                return node.component.content.main;
            return "";
        }
        return "";
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getObjectValue = (subType: SubcomponentType) : string => {
        if (props.activeNode && props.activeNode.children) {
			// Find out whether this node has a child of the passed in type
            let node = props.activeNode.children.find((node: INode) => {
                let n = node as ComponentNode;
                return n.componentType === ComponentType.object && n
            });
            return (node && node.component && node.component.content && node.component.content.main) || "";
        }
        return "";
    }

    const entryTextChanged = (e: any) => {
        let { value } = e.target;
        setEntryText(value);
    }

    useEffect(() => {
        setEntryText(props.activeNode.node.data.entry.content);
    }, [props.activeNode.node.data.entry.content])

    return (
        props.activeNode &&
        (<><ModalBody>
        <div className="container-fluid entry-editor">
            <div className="row">
				<div className="col-md-2 pl-4 py-4">
					{/*<button className="accordion" onClick={() => toggleAccordion("collapseTop", collapse.collapseTop)}>*/}
						{/*<Chevron className={`${rotateTop}`} width={10} fill={"#777"} />*/}
						<strong className="accordion__title">{props.activeNode.node.data.nodeType} (entry)</strong>
					{/*</button>*/}
				</div>
				<div className="col-md-10 d-flex justify-content-start align-items-center">
					<Toggle
                        id='is-negated-status'
                        defaultChecked={isNegated}
                        aria-labelledby='is-negated-label'
                        onChange={changeIsNegated} />
					<span id='is-negated-label' className="ml-2">Negated</span>
					<Toggle
                        id='has-object-status'
                        defaultChecked={hasObject}
                        aria-labelledby='has-object-label'
                        onChange={changeHasObject}
						className="ml-5" />
					<span id='has-sanction-label' className="ml-2">Has an Object component</span>
					<Toggle
                        id='has-sanction-status'
                        defaultChecked={hasSanction}
                        aria-labelledby='has-sanction-label'
                        onChange={changeHasSanction}
						className="ml-5" />
					<span id='has-sanction-label' className="ml-2">Has an Or else component (sanction)</span>
				</div>
				{/*<div className="col-md-2 d-inline-flex justify-content-end align-items-center">
					<button id="save-button-top" type="button" className="btn btn-primary" onClick={saveEntryData}>Save Changes</button>
				</div>*/}
			</div>

			<div className="row">
				<div className="col-md-12">
					<textarea name="node-entry-content" onChange={entryTextChanged} className="form-control input-lg mb-3" value={entryText}></textarea>
				</div>
			</div>

			{/*<Collapse isOpen={collapse.collapseBottom}>*/}

			{/* Attributes, deontic, aim */}
			{/*
			<Row>
			<Col md="10">
				<Row>
					<Col md="12">
						<input type="text" defaultValue={getValue(ComponentType.attributes)} name="Attributes" onChange={updateAtoms} placeholder="Attributes" className="form-control input-lg"/>
					</Col>
				</Row>
				<Row>
					<Col md="4">
						<input type="text" defaultValue={getValue(ComponentType.deontic)} name="Deontic" onChange={updateAtoms} placeholder="Deontic" className="form-control input-lg"/>
					</Col>
					<Col md="8">
					<input type="text" defaultValue={getValue(ComponentType.aim)} name="Aim" onChange={updateAtoms} placeholder="Aim" className="form-control input-lg"/>
					</Col>
				</Row>
			</Col>
			<Col md="2">
			<button type="button" className="btn btn-dark btn-square">
				<span className="oi oi-fork"></span>
			</button>
			</Col>
			</Row>
			<hr/>
			*/}

			{/* Objects */}
			{/*
			<Row>
			<Col md="2">
			<button className="accordion" onClick={() => toggleAccordion("collapseObjects", collapse.collapseObjects)}>
				<Chevron className={`${rotateObjects}`} width={10} fill={"#777"} />
				<strong className="accordion__title">Objects</strong>
			</button>
			</Col>
			</Row>
			<Collapse isOpen={collapse.collapseObjects}>
				<Row><Col md="12">Direct Object</Col></Row>
				<Row>
					<Col md="10">
					<Row><Col md="12"><input type="text" defaultValue={getObjectValue(SubcomponentType.direct)} onChange={updateAtoms} name="DirectObject" placeholder="Object" className="form-control input-lg"/></Col></Row>
					<Row><Col md="12">Indirect Object</Col></Row>
					<Row><Col md="12"><input type="text" onChange={updateAtoms} name="IndirectObject" placeholder="Object" className="form-control input-lg"/></Col></Row>
					</Col>
					<Col md="2">
					<button type="button" className="btn btn-dark btn-square">
						<span className="oi oi-fork"></span>
					</button>
					</Col>
				</Row>
			</Collapse>
			<hr/>
			*/}


			{/* Conditions */}
			{/*
			<Row>
			<Col md="2">
			<button className="accordion" onClick={() => toggleAccordion("collapseConditions", collapse.collapseConditions)}>
				<Chevron className={`${rotateConditions}`} width={10} fill={"#777"} />
				<strong className="accordion__title">Conditions</strong>
			</button>
			</Col>
			</Row>
			<Collapse isOpen={collapse.collapseConditions}>
			<Row><Col md="12">Activation Condition</Col></Row>
				<Row>
					<Col md="10">
					<Row><Col md="12"><textarea name="ActivationCondition" onChange={updateConditions} placeholder="Condition" className="form-control input-lg"/></Col></Row>
					<Row><Col md="12">Execution Condition</Col></Row>
					<Row><Col md="12"><textarea name="ExecutionCondition" onChange={updateConditions} placeholder="Condition" className="form-control input-lg"/></Col></Row>
					</Col>
					<Col md="2">
					<button type="button" className="btn btn-dark btn-square">
						<span className="oi oi-fork"></span>
					</button>
					</Col>
			</Row>
			</Collapse>
			*/}

			{/*</Collapse>

			<hr/>
			<Row>
			<Col md="12" className="px-0">
			<button className="button form-control input-lg" onClick={() => toggleAccordion("collapseBottom", collapse.collapseBottom)}>
				<Chevron className={`${rotateBottom}`} width={10} fill={"#777"} />
			</button>
			</Col>
			</Row>*/}
		</div></ModalBody>
		<ModalFooter className="d-flex justify-content-between">
		    <button type="button" className="btn btn-secondary" onClick={props.close}>Cancel</button>
			<button id="save-button-bottom" type="button" className="btn btn-primary" onClick={saveEntryData}>Save Changes</button>
		</ModalFooter></>)
	)
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEntry: (node: INode) => dispatch(updateEntry(node))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EntryEditor);
