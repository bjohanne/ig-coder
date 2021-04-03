import React from "react";
import {connect} from "react-redux";
import {INode} from "../../../core/model/interfaces";
import CommonBarComponent from "../common/commonBar";
import ComponentChildren from "../children/componentChildren";
import TextContentComponent from "../common/textContent";
import ContextTypeComponent from "../common/contextType";

interface IProps {
    activeNode: INode
}

const ComponentEditor = (props: IProps) => {
    const {
        activeNode
    } = props;

    return (
        <>
            <CommonBarComponent/>
            <ComponentChildren>

            </ComponentChildren>
            <TextContentComponent>

            </TextContentComponent>
            <ContextTypeComponent>

            </ContextTypeComponent>
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
)(ComponentEditor);

