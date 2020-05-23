import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateJunction } from "../../../state/actions";
import { ModalBody } from 'reactstrap';
import { JunctionNode } from "../../../core/model/nodes";
import { JunctionType } from "../../../core/model/enums";
import { componentColorScaler } from "../../../core/config/scales";

const JunctionEditor = (props: any) => {  
    let active = props.activeNode.node.data as JunctionNode;
    const [junctionType, setJunctionType] = useState(null);

    useEffect(() => {
        setJunctionType(active.junctionType);
    }, [active.junctionType])

    const onChange = (value: string) => {
        const jType: JunctionType = (JunctionType)[value.toLowerCase()];
        setJunctionType(jType);
    }

    const close = () => {        
        props.updateJunction({ node: active, junctionType: junctionType });      
        props.activeNode.modalState(false);
    }

    let currentComponentColor = componentColorScaler(active.junctionType);
    
    return (        
        props.activeNode && 
        (<ModalBody><div className="modal-wrapper">
            <h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.data.junctionType} ({props.activeNode.node.data.id})</h4>
            <div className="text-control-wrap">
            <div className="radio">
  <label><input type="radio" onChange={() => onChange("AND")} value="AND" name="optradio" checked={junctionType === JunctionType.and}/>AND</label>
</div>
<div className="radio">
  <label><input type="radio" onChange={() => onChange("OR")} value="OR" name="optradio" checked={junctionType === JunctionType.or}/>OR</label>
</div>
<div className="radio disabled">
  <label><input type="radio" onChange={() => onChange("XOR")} value="XOR" name="optradio" checked={junctionType === JunctionType.xor}/>XOR</label>
</div></div>
<button className="btn-primary btn" style={{margin:5}} onClick={close}>Save</button>           
            </div></ModalBody>) 
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.reducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateJunction: (payload: any) => dispatch(updateJunction(payload))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(JunctionEditor);