import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import PropertyChildren from "../children/propertyChildren";
import TextContentComponent from "../common/textContent";
import {Entry} from "../../../core/model/entry";
import {ComponentNode} from "../../../core/model/nodes";
import {NodeType} from "../../../core/model/enums";

interface IProps {
    currentEntry: Entry,
    activeNode: ComponentNode
}

const PropertyEditor = (props: IProps) => {
    const {currentEntry, activeNode} = props;

    const textContentDisabled: boolean =
        activeNode.children.length > 0 &&
        ![NodeType.property, NodeType.propertyjunction].includes(activeNode.children[0].nodeType);

    return (
        <CommonEditorTable key={activeNode.id}>
            <TextContentComponent currentEntry={currentEntry} disabled={textContentDisabled}/>
            <hr className="pb-2"/>
            <PropertyChildren/> {/* Can always have children, no check necessary */}
        </CommonEditorTable>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

export default connect(
    mapStateToProps,
    null
)(PropertyEditor);

