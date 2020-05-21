import React, { useState } from "react";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import { updateEntry, addJunction } from "../../../state/actions";
import { SubcomponentNode } from "../../../core/model/nodes";
import { Component } from "../../../core/model/component";
import { INode } from "../../../core/model/interfaces";
import { Arg } from "../../../core/model/enums";

const SubComponentActivationEditor = (props: any) => { 
    const [hasChildJunction, setHasChildJunction] = useState(false);
    const [content, setContent] = useState("");
    let active = props.node as SubcomponentNode;
    
    let changeValue = (e: React.FormEvent<HTMLInputElement>) => {
        setContent(e.currentTarget.value);
        active.component = new Component(content);
        props.updateEntry(active);
    }

    let changeIsJunction = () => {
        let newVal = !hasChildJunction
        setHasChildJunction(newVal)
        if(newVal) {
            active.createJunctionNode();
        } else {
			active.deleteChild(Arg.only);
        }
        props.addJunction(active);
    }

    return (        
        props.activeNode && 
        (
            <div className="sub-comp-root">
                <div className="sub-comp-wrap">
                <Toggle
                    id='has-junction'
                    defaultChecked={hasChildJunction}
                    aria-labelledby='biscuit-label'
                    onChange={() => changeIsJunction()} />
                <span id='is-junc-label'>Activation is Junction</span>
            </div>
            <div className="sub-comp-wrap">
                { !hasChildJunction ? 
                    (<input type="text" 
                        style={{ width: "100%" }} 
                        placeholder={`${props.node.nodeType} ${props.node.subcomponentType}`} 
                        name="component-value" 
                        onChange={changeValue} 
                        value={content} />) : null
                }
            </div>

            
            </div>
        ) 
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.reducer.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEntry: (node: INode) => dispatch(updateEntry(node)),
    addJunction: (parentNode: INode) => dispatch(addJunction(parentNode))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubComponentActivationEditor);