import React from "react";
import {connect} from "react-redux";
import {INode} from "../../../core/model/interfaces";
import {NodeType} from "../../../core/model/enums";
import CommonBarComponent from "../common/commonBar";
import JunctionChildren from "../children/junctionChildren";
import TextContentComponent from "../common/textContent";
import FunctionallyDependentComponent from "../common/functionallyDependent";

interface IProps {
    activeNode: INode
}

const JunctionEditor = (props: IProps) => {
    const {
        activeNode
    } = props;

    return (
        <>
            <CommonBarComponent/>
            <JunctionChildren>

            </JunctionChildren>
            <TextContentComponent>

            </TextContentComponent>
            {(activeNode && activeNode.nodeType === NodeType.propertyjunction) &&
                <FunctionallyDependentComponent>

                </FunctionallyDependentComponent>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JunctionEditor);

