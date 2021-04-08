import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import StatementChildren from "../children/statementChildren";

const StatementEditor = () => {

    return (
        <CommonEditorTable>
            <StatementChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(StatementEditor);

