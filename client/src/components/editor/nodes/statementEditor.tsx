import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import StatementChildren from "../children/statementChildren";
import ViewStatementText from "../common/viewStatementText";
import {Entry} from "../../../core/model/entry";

interface IProps {
    currentEntry: Entry
}

const StatementEditor = (props: IProps) => {
    const { currentEntry } = props;

    return (
        <CommonEditorTable>
            <ViewStatementText currentEntry={currentEntry} className="pb-2"/>
            <hr className="pb-2"/>
            <StatementChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(StatementEditor);
