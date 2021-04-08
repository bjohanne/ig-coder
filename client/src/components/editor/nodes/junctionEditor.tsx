import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import JunctionTypeComponent from "../common/junctionType";
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
            <JunctionTypeComponent/>
            <TextContentComponent currentEntry={currentEntry}/>
            <JunctionChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(JunctionEditor);

