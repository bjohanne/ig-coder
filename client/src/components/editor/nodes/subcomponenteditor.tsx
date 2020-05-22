import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { INode } from "../../../core/model/interfaces";
import { updateEntry } from "../../../state/actions";
import { ModalBody } from 'reactstrap';
import { SubcomponentNode } from "../../../core/model/nodes";
import { Component } from "../../../core/model/component";
import { componentColorScaler, posColorScaler, entColorScaler } from "../../../core/config/scales";
import { NodeType, ComponentType, SubcomponentType, SubtreeType } from "../../../core/model/enums";

interface ISubcomponentData {
    prefix?: string,
    main?: string,
    suffix?: string
}

const SubComponentEditor = (props: any) => { 
    const [content, setContent] = useState<ISubcomponentData>({
        prefix: "",
        main: "",
        suffix: ""
    });
    let active = props.node as SubcomponentNode;

    const [entryContentVal, setEntryContentVal] = useState("");
    
    // let changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    //     setContent(e.currentTarget.value);
    //     active.component = new Component(content);        
    // }

    let saveComponent = () => {
        active.component = new Component(content.main, content.prefix, content.suffix);               
        props.updateEntry(active);
        props.activeNode.modalState(false);
    }

    const getparComponentType = () => {
        return props.activeNode.node.parent.data.componentType;
    }
    const getparContent = () => {
        return props.activeNode.node.parent.data.content;
    }
    const [parcomptype, setparComptype] = useState(getparComponentType());
    const [parcontent, setparcontent] = useState(getparContent());

    let currentComponentColor = componentColorScaler(props.activeNode.node.data.componentType);

    if (parcomptype === ComponentType.object) {
        return (
            props.activeNode && (
            <ModalBody>
                <div>
                    <h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.parent.data.content}I want to put parent.data.content.main here.({props.activeNode.node.data.id})</h4>
                    <div className="text-control-wrap">
                        <div className="text-control">
                            <input type="text" name="prefix" placeholder="Prefix" />
                        </div>
                        <div className="text-control">
                            <input type="text" name="main" placeholder="Main" />
                        </div>
                        <div className="text-control">
                            <input type="text" name="suffix" placeholder="Suffix" />
                        </div>
                    </div>
                    <button className="btn-success btn" style={{margin:5}} onClick={saveComponent}>Save</button>
                    <button className="btn-light btn" style={{margin:5}} onClick={saveComponent}>Clear</button>
                </div>
            </ModalBody>
            ) 
        )  
    } else if (parcomptype === ComponentType.conditions) {
	return (
		props.activeNode && (
		<ModalBody>
			<div>
				<h4 style={{ padding: "1rem", color: "#fff", backgroundColor: currentComponentColor.toString() }}>{props.activeNode.node.parent.data.content}({props.activeNode.node.data.id})</h4>
				<div className="text-control-wrap">
					<div className="text-control">
						<input type="text" name="prefix" placeholder="Prefix" />
					</div>
					<div className="text-control">
						<input type="text" name="main" placeholder="Main" />
					</div>
					<div className="text-control">
						<input type="text" name="suffix" placeholder="Suffix" />
					</div>
				</div>
				<button className="btn-success btn" style={{margin:5}} onClick={saveComponent}>Save</button>
				<button className="btn-light btn" style={{margin:5}} onClick={saveComponent}>Clear</button>
			</div>
		</ModalBody>
		)
	)
	} else {
		return (
			props.activeNode && (
			<div>
			<input type="text" style={{ width: "100%" }} placeholder={`${props.activeNode.nodeType} ${props.activeNode.subcomponentType}`} name="component-value"  />            
			</div>
			) 
		)
    }
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