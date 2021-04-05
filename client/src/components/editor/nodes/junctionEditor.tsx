import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import JunctionChildren from "../children/junctionChildren";
import TextContentComponent from "../common/textContent";

const JunctionEditor = (props) => {

    return (
        <CommonEditorTable>
            <JunctionChildren/>
            <TextContentComponent/>
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
)(JunctionEditor);

