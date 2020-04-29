import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { INode, INormAndConvention } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { ModalBody } from 'reactstrap';
import { ComponentNode } from "../../core/model/nodes";
import { Component } from "../../core/model/component";
const ComponentEditor = (props: any) => { 
    const [content, setContent] = useState("");
    const [entryContentVal, setEntryContentVal] = useState("");
    const [saveEnabled, setSaveEnabled] = useState(false);
    let active = props.activeNode.data as ComponentNode;
    let parent = props.activeNode.parent.data as INormAndConvention;
    let entryContent = parent.entry.content;

    useEffect(() => {        
    
        if(active.component.content && active.component.content.main) {
            setContent(active.component.content.main);
        }
    
        if(entryContent) {
            setEntryContentVal(entryContent);
        }
    }, [active.component.content, entryContent, props.activeNode])

    
    let changeValue = (e: React.FormEvent<HTMLInputElement>) => {
        // we know that the parent is an entry (this being a component)
        if(entryContent) {
            let written = e.currentTarget.value;
            let textExists = parent.entry.content.indexOf(written) > -1
            if(textExists) {                
                setEntryContentVal(entryContent.replace(written, `<mark>${written}</mark>`));                
            }
            setSaveEnabled(textExists);
            setContent(written);
        }
    }

    let saveComponent = () => {
        console.log(active);
        console.log(props);
        if(active.component.content == null) {
            active.component = new Component(content);
        } else {
            active.component.content.main = content;
        }        
        props.updateEntry(active);
    }

    return (        
        props.activeNode && 
        (<ModalBody>
            <div>
            <div className="component-editor-entry-text" dangerouslySetInnerHTML={{__html: entryContentVal }}></div>
            <div className="component-editor-input-controls"><input type="text" name="component-value" onChange={changeValue} value={content} />
            <button disabled={!saveEnabled} className="btn-success btn" onClick={saveComponent}>Save</button>
            </div>
            </div>
        </ModalBody>) 
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
  )(ComponentEditor);