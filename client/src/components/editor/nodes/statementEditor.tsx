import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import StatementChildren from "../children/statementChildren";

const StatementEditor = () => {

    return (
        <CommonEditorTable>
            <hr className="pb-2"/>
            <StatementChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(StatementEditor);

