import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import StatementChildren from "../children/statementChildren";
import ViewStatementText from "../common/viewStatementText";
import {Entry} from "../../../core/model/entry";
import {StatementNode} from "../../../core/model/nodes";

interface IProps {
    currentEntry: Entry,
    activeNode: StatementNode
}

const StatementEditor = (props: IProps) => {
    const { currentEntry, activeNode } = props;

    return (
        <CommonEditorTable key={activeNode.id}>
            <ViewStatementText currentEntry={currentEntry} className="pb-2"/>
            <hr className="pb-2"/>
            <StatementChildren/>
        </CommonEditorTable>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

export default connect(
    mapStateToProps,
    null
)(StatementEditor);
