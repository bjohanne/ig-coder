import React, {useState} from "react";
import {connect} from "react-redux";
import {turnFunctionallyDependentOn, turnFunctionallyDependentOff} from "../../../state/model/actions";
import {PropertyNode, PropertyJunctionNode} from "../../../core/model/nodes";

interface IProps {
    activeNode: PropertyNode | PropertyJunctionNode,
    currentEntryIndex: Number,
    turnFunctionallyDependentOn: Function,
    turnFunctionallyDependentOff: Function
}

const FunctionallyDependentComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        turnFunctionallyDependentOn,
        turnFunctionallyDependentOff
    } = props;

    const [funcDepState, setFuncDepState] =
        // Double-negating to convert from Boolean to boolean for below input defaultChecked
        useState(!!activeNode.isFunctionallyDependent);

    const handleChange = (e) => {
        setFuncDepState(e.currentTarget.checked);
    }

    const handleSave = () => {
        if (funcDepState) {
            turnFunctionallyDependentOn(currentEntryIndex, activeNode.id);
        } else {
            turnFunctionallyDependentOff(currentEntryIndex, activeNode.id);
        }
    }

    return (
        <div className="custom-control custom-switch">
            <input defaultChecked={funcDepState} type="checkbox"
                   onChange={handleChange} onBlur={handleSave} onMouseOut={handleSave}
                   className="custom-control-input" id="funcdep-switch"/>
            <label className="custom-control-label" htmlFor="funcdep-switch"
                   title="This property is functionally dependent on its parent">Functionally dependent</label>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex
});

const mapDispatchToProps = (dispatch: any) => ({
    turnFunctionallyDependentOn: (entryIndex: number, nodeId: number) => dispatch(turnFunctionallyDependentOn(entryIndex, nodeId)),
    turnFunctionallyDependentOff: (entryIndex: number, nodeId: number) => dispatch(turnFunctionallyDependentOff(entryIndex, nodeId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FunctionallyDependentComponent);

