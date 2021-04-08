import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import PropertyChildren from "../children/propertyChildren";
import TextContentComponent from "../common/textContent";
import {Entry} from "../../../core/model/entry";

interface IProps {
    currentEntry: Entry
}

const PropertyEditor = (props: IProps) => {
    const {currentEntry} = props;

    return (
        <CommonEditorTable>
            <TextContentComponent currentEntry={currentEntry}/>
            <PropertyChildren/>
        </CommonEditorTable>
    )
}

export default connect(
    null,
    null
)(PropertyEditor);

