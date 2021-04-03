import React from "react";
import {connect} from "react-redux";
import {INode} from "../../../core/model/interfaces";
import CommonBarComponent from "../common/commonBar";
import StatementChildren from "../children/statementChildren";
import ContextTypeComponent from "../common/contextType";

interface IProps {
    activeNode: INode
}

const StatementEditor = (props: IProps) => {
    const {
        activeNode
    } = props;

    return (
        <>
            <CommonBarComponent/>
            <StatementChildren>

            </StatementChildren>
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
)(StatementEditor);

