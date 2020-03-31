import React, { useState } from "react";
import { connect } from "react-redux";
import { Collapse, Button, Row, Col, ModalBody, ModalFooter } from 'reactstrap';
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { buildEntrySubTree } from "../../core/model/builder";
import Chevron from "../units/chevron";
import { NodeType, ComponentType, SubcomponentType } from "../../core/model/enums";
import ComponentNode from "../../core/model/nodes/component";

const EntryEditor = (props: any) => {    
    console.log("Get some props! ", props);
    const [collapse, setCollapse] = useState({ collapseTop: false, collapseBottom: false, collapseObjects: false, collapseConditions: false });
    
    const [atoms, setAtoms] = useState({ Attributes: null, Deontics: null, Aim: null, DirectObject: null, IndirectObject: null })
    const [conditions, setConditions] = useState({ ActivationCondition: null, ExecutionCondition: null });
    const [OrElse, setOrElse] = useState(null);

    const updateAtoms = (e: any) => {        
        setAtoms({
          ...atoms,
          [e.target.name]: e.target.value
        });        
    };

    const updateConditions = (e: any) => {
        setConditions({
            ...conditions,
            [e.target.name]: e.target.value
        });
    };

    const updateOrElse = (e: any) => {
        setOrElse(e.target.value);
    }

    const saveEntryData = () => {
        try {
            buildEntrySubTree(props.activeNode, atoms, conditions, OrElse, props.updateEntry);   
            props.close(); 
        } catch(error) {
            alert(error);
        }   
    }


    const [setRotate, setRotateState] = useState("accordion__icon");
    const [setRotateBottom, setRotateStateBottom] = useState("accordion__icon accordion-bottom");
    const [setRotateObjects, setRotateStateObjects] = useState("accordion__icon");
    const [setRotateConditions, setRotateStateConditions] = useState("accordion__icon");
    
    const [setActive, setActiveState] = useState("");
    const [setActiveBottom, setActiveStateBottom] = useState("");
    const [setActiveObjects, setActiveStateObjects] = useState("");
    const [setActiveConditions, setActiveStateConditions] = useState("");
    

    const toggleAccordion = (accordion: string, collapseValue: boolean) => {
        if(accordion === "collapseTop") { 
            setActiveState(setActive === "" ? "active" : "");
            setRotateState(setActive === "active" ? "accordion__icon" : "accordion__icon rotate");
        } else if(accordion === "collapseBottom") {
            setActiveStateBottom(setActiveBottom === "" ? "active" : "");
            setRotateStateBottom(setActiveBottom === "active" ? "accordion__icon accordion-bottom" : "accordion__icon rotate-bottom");
        } else if(accordion === "collapseObjects") {
            console.log(setRotateObjects);
            setActiveStateObjects(setActiveObjects === "" ? "active" : "");
            setRotateStateObjects(setActiveObjects === "active" ? "accordion__icon" : "accordion__icon rotate");
        } else if(accordion === "collapseConditions") {
            setActiveStateConditions(setActiveConditions === "" ? "active" : "");
            setRotateStateConditions(setActiveConditions === "active" ? "accordion__icon" : "accordion__icon rotate");
        }
        setCollapse({
            ...collapse,
            [accordion]: !collapseValue
        });
    }

    const getValue = (type: ComponentType) => {
        if(props.activeNode && props.activeNode.children) {
            let nnode = props.activeNode.children.find((node: INode) => {
                if(node.nodeType === NodeType.component) {
                    return (node as ComponentNode).componentType == type;
                }
                return false;
            });
            if(nnode && typeof(nnode.component.content) !== "undefined")
                return nnode.component.content.main;
            return "";
        }
        return "";
    }

    const getObjectValue = (subType: SubcomponentType) => {
        if(props.activeNode && props.activeNode.children) {
            let node = props.activeNode.children.find((node: INode) => {
                let n = node as ComponentNode;
                return n.componentType == ComponentType.object && n
            });
            return node && node.component && node.component.content && node.component.content.main || "";
        }
        return "";
    }
    
    return (        
        props.activeNode &&
        (<><ModalBody>          
        <div className="container-fluid entry-editor">
            <div className="row">
            <div className="col-md-2">
            <button className="accordion" onClick={() => toggleAccordion("collapseTop", collapse.collapseTop)}>
                <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
                <strong className="accordion__title">#1</strong> 
            </button>
            </div>
            <div className="col-md-10"><div className="truncate accordion-title">{props.activeNode.entry.content}</div></div>
            </div>

            <Collapse isOpen={collapse.collapseTop}>            
            <div className="row">
                <div className="col-md-12">
                    <textarea name="node-entry-content" className="form-control input-lg" defaultValue={props.activeNode.entry.content}></textarea>                
                </div>
            </div>            
            </Collapse>

            <Collapse isOpen={collapse.collapseBottom}>
            {/* Attributes, deontics, aim */}
            <Row>                
            <Col md="10">
                <Row>
                    <Col md="12">
                        <input type="text" defaultValue={getValue(ComponentType.attributes)} name="Attributes" onChange={updateAtoms} placeholder="Attributes" className="form-control input-lg"/>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <input type="text" defaultValue={getValue(ComponentType.deontic)} name="Deontics" onChange={updateAtoms} placeholder="Deontics" className="form-control input-lg"/>
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

            {/* Objects */}
            <Row>
            <Col md="2">
            <button className="accordion" onClick={() => toggleAccordion("collapseObjects", collapse.collapseObjects)}>
                <Chevron className={`${setRotateObjects}`} width={10} fill={"#777"} />
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

            {/* Conditions */}
            <Row>
            <Col md="2">
            <button className="accordion" onClick={() => toggleAccordion("collapseConditions", collapse.collapseConditions)}>
                <Chevron className={`${setRotateConditions}`} width={10} fill={"#777"} />
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
                    <hr/>
                    <Row><Col md="12"><textarea name="OrElse" onChange={updateOrElse} placeholder="Or else" className="form-control input-lg"/></Col></Row>
                    </Col>
                    <Col md="2">
                    <button type="button" className="btn btn-dark btn-square">
                    <span className="oi oi-fork"></span>
                    </button>
                    </Col>
            </Row>    
            </Collapse>
            
            </Collapse>
            
            <Row>
            <Col md="12">
            <button className="button form-control input-lg" onClick={() => toggleAccordion("collapseBottom", collapse.collapseBottom)}>
            <Chevron className={`${setRotateBottom}`} width={10} fill={"#777"} />
            </button>
            </Col>
            </Row>
        </div></ModalBody>
          <ModalFooter>
            <Button color="success" onClick={saveEntryData}>Save Changes</Button>            
          </ModalFooter></>) || <h2>No blah Entry</h2>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.reducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEntry: (node: INode) => dispatch(updateEntry(node))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EntryEditor);