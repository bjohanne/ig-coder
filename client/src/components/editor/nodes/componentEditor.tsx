import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import ComponentChildren from "../children/componentChildren";
import TextContentComponent from "../common/textContent";
import {Entry} from "../../../core/model/entry";

interface IProps {
    currentEntry: Entry
}

const ComponentEditor = (props: IProps) => {
    const {currentEntry} = props;

    return (
        <CommonEditorTable>
            <TextContentComponent currentEntry={currentEntry}/>
            <ComponentChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(ComponentEditor);

