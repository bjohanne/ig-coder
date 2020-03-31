import React from "react";
import { connect } from "react-redux";
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { ModalBody } from 'reactstrap';
const ComponentEditor = (props: any) => {    
    return (        
        props.activeNode && 
        (<ModalBody><div>This should be a component enabling editing a component</div></ModalBody>) 
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