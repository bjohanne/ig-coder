import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import TextContentComponent from "../common/textContent";
import JunctionChildren from "../children/junctionChildren";
import {Entry} from "../../../core/model/entry";
import {JunctionNode} from "../../../core/model/nodes";

interface IProps {
    currentEntry: Entry,
    activeNode: JunctionNode
}

const JunctionEditor = (props: IProps) => {
    const {currentEntry, activeNode} = props;

    return (
        <CommonEditorTable key={activeNode.id}>
            {/* Text content is always present on Junction nodes */}
            <TextContentComponent currentEntry={currentEntry} disabled={false}/>
            <hr className="pb-2"/>
            <JunctionChildren/>
        </CommonEditorTable>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

export default connect(
    mapStateToProps,
    null
)(JunctionEditor);

