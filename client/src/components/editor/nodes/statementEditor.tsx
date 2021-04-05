import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import StatementChildren from "../children/statementChildren";

const StatementEditor = (props) => {

    return (
        <CommonEditorTable>
            <StatementChildren/>
        </CommonEditorTable>
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

