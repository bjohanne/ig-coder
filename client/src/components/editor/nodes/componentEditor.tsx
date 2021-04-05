import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import ComponentChildren from "../children/componentChildren";
import TextContentComponent from "../common/textContent";

const ComponentEditor = (props) => {

    return (
        <CommonEditorTable>
            <ComponentChildren/>
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
)(ComponentEditor);

