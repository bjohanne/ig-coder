import React, { useState } from "react";
import { connect } from "react-redux";
import { INode } from "../../../core/model/interfaces";
import { updateEntry } from "../../../state/actions";
import { SubcomponentNode } from "../../../core/model/nodes";
import { Component } from "../../../core/model/component";

const SubComponentEditor = (props: any) => { 
    const [content, setContent] = useState("");
    let active = props.node as SubcomponentNode;
    
    let changeValue = (e: React.FormEvent<HTMLInputElement>) => {
        setContent(e.currentTarget.value);
        active.component = new Component(content);        
    }

    return (        
        props.activeNode && 
        (
            <div>
            <input type="text" style={{ width: "100%" }} placeholder={`${props.activeNode.nodeType} ${props.activeNode.subcomponentType}`} name="component-value" onChange={changeValue} value={content} />            
            </div>
        ) 
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
  )(SubComponentEditor);