import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import PropertyChildren from "../children/propertyChildren";
import TextContentComponent from "../common/textContent";

const PropertyEditor = (props) => {

    return (
        <CommonEditorTable>
            <PropertyChildren/>
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
)(PropertyEditor);

