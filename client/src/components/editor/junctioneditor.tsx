import React, { useState } from "react";
import { connect } from "react-redux";
import { INode } from "../../core/model/interfaces";
import { updateEntry } from "../../state/actions";
import { ModalBody } from 'reactstrap';
const JunctionEditor = (props: any) => {    
    return (        
        props.activeNode && 
        (<ModalBody><div>Here, my friend, you can edit a junction... You can for example add an entry (composite node)</div></ModalBody>) 
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
  )(JunctionEditor);