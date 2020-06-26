import React, { useEffect, useState } from "react";
import ModalBody from 'react-bootstrap/ModalBody';
import { componentColorScaler } from "../../../core/config/scales";
import { connect } from "react-redux";
import { NegationNode } from "../../../core/model/nodes";
import { INode } from "../../../core/model/interfaces";
import { NodeType, Arg } from "../../../core/model/enums";
import { updateNegation } from "../../../state/documents/actions";

const NegationEditor = (props: any) => {

    let active = props.activeNode.node.data as NegationNode;
    const [hasConvention, setHasConvention] = useState(false);
    const [hasNorm, setHasNorm] = useState(false);

    useEffect(() => {
        if(active.children.filter((node: INode) => node.nodeType === NodeType.norm).length > 0) {
            setHasNorm(true);
        } else {
            setHasNorm(false);
        }
        if(active.children.filter((node: INode) => node.nodeType === NodeType.convention).length > 0) {
            setHasConvention(true);
        } else {
            setHasConvention(false);
        }
    }, [active.children])

    let currentComponentColor = componentColorScaler("NegationNode");

    const select = (value: string) => {
        let checked: boolean;

        switch(value) {
            case "Norm":
                checked = !hasNorm;
                if(checked) {
                    active.createNormOrConventionNode(Arg.norm, "");
                } else {
                    active.deleteChild(Arg.only);
                }
                setHasNorm(checked);
                break;
            case "Convention":
                checked = !hasConvention;
                if(checked) {
                    active.createNormOrConventionNode(Arg.convention, "");
                } else {
                    active.deleteChild(Arg.only);
                }
                setHasConvention(checked);
                break;
            default:
                break;


        }
    }

    const saveAndClose = () => {
        props.updateNegation({ node: active });
        props.close()
    }

    return (
        props.activeNode &&
        (<ModalBody><div className="modal-wrapper">
            <h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.data.junctionType} ({props.activeNode.node.data.id})</h4>
            <div className="text-control-wrap">
            <button className="btn-primary btn" style={{margin:5}} onClick={() => select("Norm")} disabled={hasConvention}>Add Norm</button>
            <button className="btn-primary btn" style={{margin:5}} onClick={() => select("Convention")} disabled={hasNorm}>Add Convention</button>

        </div>
        <button className="btn-primary btn" style={{margin:5}} onClick={() => saveAndClose()}>Save</button>
    </div></ModalBody>)
    )
}


const mapStateToProps = (state: any) => ({
    activeNode: state.documentReducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateNegation: (node: INode) => dispatch(updateNegation(node))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NegationEditor);
