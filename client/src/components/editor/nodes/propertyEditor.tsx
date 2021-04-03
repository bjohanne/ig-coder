import React from "react";
import {connect} from "react-redux";
import {INode} from "../../../core/model/interfaces";
import CommonBarComponent from "../common/commonBar";
import PropertyChildren from "../children/propertyChildren";
import TextContentComponent from "../common/textContent";
import ContextTypeComponent from "../common/contextType";
import FunctionallyDependentComponent from "../common/functionallyDependent";

interface IProps {
    activeNode: INode
}

const PropertyEditor = (props: IProps) => {
    const {
        activeNode
    } = props;

    return (
        <>
            <CommonBarComponent/>
            <PropertyChildren>

            </PropertyChildren>
            <TextContentComponent>

            </TextContentComponent>
            <ContextTypeComponent>

            </ContextTypeComponent>
            <FunctionallyDependentComponent>

            </FunctionallyDependentComponent>
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
)(PropertyEditor);

