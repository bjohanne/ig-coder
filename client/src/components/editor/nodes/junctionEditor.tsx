import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import TextContentComponent from "../common/textContent";
import JunctionChildren from "../children/junctionChildren";
import {Entry} from "../../../core/model/entry";

interface IProps {
    currentEntry: Entry
}

const JunctionEditor = (props: IProps) => {
    const {currentEntry} = props;

    return (
        <CommonEditorTable>
            <TextContentComponent currentEntry={currentEntry} disabled={false}/> {/* Text content is always present on Junction nodes */}
            <hr className="pb-2"/>
            <JunctionChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(JunctionEditor);

