import React, {useState} from "react";
import {connect} from "react-redux";
import {INode} from "../../../core/model/interfaces";
import {turnNegationOn, turnNegationOff} from "../../../state/model/actions";

interface IProps {
    activeNode: INode,
    currentEntryIndex: Number,
    turnNegationOn: Function,
    turnNegationOff: Function
}

const NegatedComponent = (props: IProps) => {
    const {
        activeNode,
        currentEntryIndex,
        turnNegationOn,
        turnNegationOff
    } = props;

    const [negatedState, setNegatedState] = useState(activeNode.isNegated);

    const handleChange = (e) => {
        setNegatedState(e.currentTarget.checked);
    }

    const handleSave = () => {
        if (negatedState) {
            turnNegationOn(currentEntryIndex, activeNode.id);
        } else {
            turnNegationOff(currentEntryIndex, activeNode.id);
        }
    }

    return (
        <div className="custom-control custom-switch">
            <input defaultChecked={negatedState} type="checkbox"
                   onChange={handleChange} onBlur={handleSave} onMouseOut={handleSave}
                   className="custom-control-input" id="negated-switch"/>
            <label className="custom-control-label" htmlFor="negated-switch" title="This node's meaning is negative">Negated</label>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    currentEntryIndex: state.documents.currentEntryIndex
});

const mapDispatchToProps = (dispatch: any) => ({
    turnNegationOn: (entryIndex: number, nodeId: number) => dispatch(turnNegationOn(entryIndex, nodeId)),
    turnNegationOff: (entryIndex: number, nodeId: number) => dispatch(turnNegationOff(entryIndex, nodeId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NegatedComponent);

