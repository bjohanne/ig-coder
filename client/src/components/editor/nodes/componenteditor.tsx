import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { INode, INormAndConvention } from "../../../core/model/interfaces";
import { updateEntry } from "../../../state/actions";
import { ModalBody } from 'reactstrap';
import { ComponentNode } from "../../../core/model/nodes";
import { Component } from "../../../core/model/component";
import { componentColorScaler, posColorScaler, entColorScaler } from "../../../core/config/scales";
import SubComponentEditor from "./subcomponenteditor";
import SubComponentActivationEditor from "./subcomponentactivationeditor";
import { ComponentType } from "../../../core/model/enums";

interface IComponentData {
    prefix?: string,
    main?: string,
    suffix?: string
}

const ComponentEditor = (props: any) => { 
    const [content, setContent] = useState<IComponentData>({
        prefix: "",
        main: "",
        suffix: ""
    });

    const [entryContentVal, setEntryContentVal] = useState("");
    const [saveEnabled, setSaveEnabled] = useState(false);
    let active = props.activeNode.node.data as ComponentNode;
    let parent = props.activeNode.node.parent.data as INormAndConvention;
    let entryContent = parent.entry.content;

    useEffect(() => {        
    
        if(active.component.content && active.component.content.main) {
            setContent({ main: active.component.content.main });
        }
    
        if(entryContent) {
            setEntryContentVal(entryContent);
        }
    }, [active.component.content, entryContent, props.activeNode])

    let currentComponentColor = componentColorScaler(props.activeNode.node.data.componentType);

    let changeValue = (e: any) => {
        // we know that the parent is an entry (this being a component)
        if(entryContent) {
            const {name, value} = e.target
            let written = value;
            let textExists = parent.entry.content.indexOf(written) > -1
            if(textExists) {                
                setEntryContentVal(entryContent.replace(written, `<mark style='background-color: ${currentComponentColor}'>${written}</mark>`));                
            }
            setSaveEnabled(textExists && written.length > 0);
            setContent((prev) => ({ ...prev, [name]: written }));
        }
    }

    let saveComponent = () => {
        active.component = new Component(content.main, content.prefix, content.suffix);               
        props.updateEntry(active);
        props.activeNode.modalState(false);
    }

    let mouseOverPos = (pos: string) => {
        let texts: string[] = props.activeNode.pos[pos];
        let content = entryContent;
        let posColor = posColorScaler(pos);
        texts.forEach((text: string) => {
            content = content.replace(text, `<mark style='background-color: ${posColor}'>${text}</mark>`); 
        });
        setEntryContentVal(content);
    }

    let mouseOutOfPos = () => {
        setEntryContentVal(entryContent);
    }

    let mouseOverEnt = (ent: string) => {
        let texts: string[] = props.activeNode.ents[ent];
        let content = entryContent;
        let entColor = entColorScaler(ent);
        texts.forEach((text: string) => {
            content = content.replace(text, `<mark style='background-color: ${entColor}'>${text}</mark>`);             
        });
        setEntryContentVal(content);
    }

    let mouseOutOfEnt = () => {
        setEntryContentVal(entryContent);
    }

    return (        
        props.activeNode && 
        (<ModalBody>
            <div>
            <h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.data.componentType} ({props.activeNode.node.data.id})</h4>
            <div className="component-editor-entry-text" dangerouslySetInnerHTML={{__html: entryContentVal }}></div>
            <div className="component-editor-input-controls">
            <div className="nlp-controls">
            <div className="text-control-wrap">
                <div className="text-control">
                    <input type="text" name="prefix" placeholder="Prefix" onFocus={changeValue} onMouseOver={changeValue} onChange={changeValue} value={content.prefix} />
                </div>
                <div className="text-control">
                    <input type="text" name="main" placeholder="Main" onFocus={changeValue} onMouseOver={changeValue} onChange={changeValue} value={content.main} />
                </div>
                <div className="text-control">
                    <input type="text" name="suffix" placeholder="Suffix" onFocus={changeValue} onMouseOver={changeValue} onChange={changeValue} value={content.suffix} />
                </div>
            </div>
            { active.componentType === ComponentType.conditions && 
            <>
                <SubComponentActivationEditor node={active.children[0]}/>
                <SubComponentEditor node={active.children[1]}/>
            </>
            }
            <button className="btn-success btn" onClick={saveComponent}>Save</button>
            </div>
            <div className="nlp-wrap">
                <div>
                    <h4>Named entities</h4>
                    <div className="ents">
                        {
                            props.activeNode.ents ?
                            Object.keys(props.activeNode.ents).map((key: any) => {
                            return (<div className="ent"><span className="badge ent-text" style={{ backgroundColor: entColorScaler(key) }} onMouseOver={() => mouseOverEnt(key)} onMouseOut={() => mouseOutOfEnt()}>{key} ({props.activeNode.ents[key].length})</span></div>)
                            }) : (<h4>None</h4>)
                        }
                    </div>
                    <h4>Part of speech tags</h4>
                    <div className="pos-tags">
                        {
                            Object.keys(props.activeNode.pos).map((key: any) => {
                                return (<div className="pos"><span className="badge pos-text" style={{ backgroundColor: posColorScaler(key) }} onMouseOver={() => mouseOverPos(key)} onMouseOut={() => mouseOutOfPos()}>{key} ({props.activeNode.pos[key].length})</span></div>)
                            })
                        }
                    </div>
                </div>
            </div>


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