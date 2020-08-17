import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateJunction } from "../../../state/documents/actions";
import ModalBody from 'react-bootstrap/ModalBody';
import { JunctionNode, SubcomponentNode } from "../../../core/model/nodes";
import { JunctionType, NodeType, Arg, SubcomponentType } from "../../../core/model/enums";
import { componentColorScaler } from "../../../core/config/scales";
import { INode } from "../../../core/model/interfaces";

const JunctionEditor = (props: any) => {
    let active = props.activeNode.node.data as JunctionNode;
    const [hasNegate, setHasNegate] = useState(false);
    const [hasConvention, setHasConvention] = useState(false);
    const [hasNorm, setHasNorm] = useState(false);
    const [hasDirect, setHasDirect] = useState(false);
    const [hasIndirect, setHasIndirect] = useState(false);

    useEffect(() => {
        let children = active.children;

        if(children.filter((node: INode) => node.nodeType === NodeType.component && (node as SubcomponentNode).subcomponentType === SubcomponentType.direct).length > 0) {
            setHasDirect(true);
        }
        if(children.filter((node: INode) => node.nodeType === NodeType.component && (node as SubcomponentNode).subcomponentType === SubcomponentType.indirect).length > 0) {
            setHasIndirect(true);
        }
        if(children.filter((node: INode) => node.nodeType === NodeType.negation).length > 0) {
            setHasNegate(true);
        }
        if(children.filter((node: INode) => node.nodeType === NodeType.norm).length > 0) {
            setHasNorm(true);
        }
        if(children.filter((node: INode) => node.nodeType === NodeType.sanction).length > 0) {
            setHasConvention(true);
        }

        setJunctionType(active.junctionType);
    }, [active.children, active.junctionType])

    const [junctionType, setJunctionType] = useState(null);

    const onChange = (value: string) => {
        const jType: JunctionType = (JunctionType)[value.toLowerCase()];
        setJunctionType(jType);
    }

    const close = () => {
        props.updateJunction({ node: active, junctionType: junctionType });
        props.activeNode.modalState(false);
    }

    const select = (e: any) => {
        const {checked, value} = e.target;
        switch(value) {
            case "Norm":
                if(checked) {
                    active.createNormOrConventionNode(Arg.norm, Arg.left, "");
                } else {
                    active.deleteChild(Arg.left);
                }
                setHasNorm(checked);
                break;
            case "Convention":
                if(checked) {
                    active.createNormOrConventionNode(Arg.convention, Arg.left, "");
                } else {
                    active.deleteChild(Arg.left);
                }
                setHasConvention(checked);
                break;
            case "Negation":
                active.createNegationNode(Arg.right);
                setHasNegate(checked);
                break;
            case "Direct":
                if(checked) {
                    active.createSubcomponentNode(SubcomponentType.direct, Arg.left);
                    active.createSubcomponentNode(SubcomponentType.direct, Arg.right);
                } else {
                    active.deleteChild(Arg.left);
                    active.deleteChild(Arg.right);
				}
                setHasDirect(checked);
                break;
            case "Indirect":
                if(checked) {
                    active.createSubcomponentNode(SubcomponentType.indirect, Arg.left);
                    active.createSubcomponentNode(SubcomponentType.indirect, Arg.right);
                } else {
                    active.deleteChild(Arg.left);
                    active.deleteChild(Arg.right);
				}
                setHasIndirect(checked);
                break;
            default:
                break;


        }
    }

    let currentComponentColor = componentColorScaler(active.junctionType);

    return (
        props.activeNode &&
        (<ModalBody><div className="modal-wrapper">
            <h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.data.junctionType} ({props.activeNode.node.data.id})</h4>
            <div className="text-control-wrap">
            <div className="radio-wrap">
                <div className="radio">
                <label>
                    <input type="radio" onChange={() => onChange("AND")} value="AND" name="optradio" checked={junctionType === JunctionType.and}/>
                    AND</label>
                </div>
                <div className="radio">
                <label>
                    <input type="radio" onChange={() => onChange("OR")} value="OR" name="optradio" checked={junctionType === JunctionType.or}/>
                    OR</label>
                </div>
                <div className="radio">
                    <label><input type="radio" onChange={() => onChange("XOR")} value="XOR" name="optradio" checked={junctionType === JunctionType.xor}/>
                    XOR</label>
                </div>
            </div>
            <div className="checkbox-wrap">


                <div className="checkbox-wrap">
                    <div className={`checkbox ${(active.subcomponentType === SubcomponentType.activation ? "show" : "hide")}`}>
                        <label>Norm</label>
                        <input type="checkbox" name="children" onChange={select} value="Norm" disabled={(hasDirect || hasIndirect || hasConvention)}/>
                    </div>
                    <div className={`checkbox ${(active.subcomponentType === SubcomponentType.activation ? "show" : "hide")}`}>
                        <label>Convention</label>
                        <input type="checkbox" name="children" onChange={select} value="Convention" disabled={(hasDirect || hasIndirect || hasNorm)}/>
                    </div>
                    <div className={`checkbox ${(active.subcomponentType === SubcomponentType.activation ? "show" : "hide")}`}>
                        <label>Negation</label>
                        <input type="checkbox" name="children" onChange={select} value="Negation" disabled={(hasDirect || hasIndirect) && !(hasConvention && hasNorm)}/>
                    </div>
                    <div className={`checkbox ${(active.subcomponentType === SubcomponentType.direct ? "show" : "hide")}`}>
                        <label>Attributes</label>
                        <input type="checkbox" name="children" onChange={select} value="Direct" disabled={(hasNegate || hasNorm || hasConvention || hasIndirect)}/>
                    </div>
                    <div className={`checkbox ${(active.subcomponentType === SubcomponentType.indirect ? "show" : "hide")}`}>
                        <label>Objects</label>
                        <input type="checkbox" name="children" onChange={select} value="Indirect" disabled={(hasNegate || hasNorm || hasConvention || hasDirect)}/>
                    </div>

                </div>
            </div>
        </div>
        <button className="btn-primary btn" style={{margin:5}} onClick={close}>Save</button>
    </div></ModalBody>)
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateJunction: (payload: any) => dispatch(updateJunction(payload))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JunctionEditor);
