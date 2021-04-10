import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import ComponentChildren from "../children/componentChildren";
import TextContentComponent from "../common/textContent";
import {Entry} from "../../../core/model/entry";
import {ComponentNode} from "../../../core/model/nodes";
import {ComponentType, NodeType} from "../../../core/model/enums";

interface IProps {
    currentEntry: Entry,
    activeNode: ComponentNode
}

const ComponentEditor = (props: IProps) => {
    const {currentEntry, activeNode} = props;

    // If this conditional rendering is too slow:
    // Make these checks in the text content save function (preventing throwing) (and remember to narrow to Component node type)
    // AND in the children component's add child function.

    return (
        <CommonEditorTable>
            {/* A Component node cannot have text content under the following conditions (never for ActConds/ExeCstrts): */}
            {![ComponentType.activationconditions, ComponentType.executionconstraints].includes(activeNode.componentType) &&
            <TextContentComponent currentEntry={currentEntry} disabled={
                ([ComponentType.orelse, ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) &&
                    activeNode.children.length > 0) ||
                ([ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject,
                    ComponentType.constitutingproperties, ComponentType.constitutedentity].includes(activeNode.componentType) &&
                activeNode.children.length > 0 && ![NodeType.property, NodeType.propertyjunction].includes(activeNode.children[0].nodeType))
            }/>
            }
            {/* A Component node cannot have children under the following conditions (never for 3 types): */}
            {![ComponentType.deontic, ComponentType.modal, ComponentType.simplecontext].includes(activeNode.componentType) &&
            <ComponentChildren disabled={
                !!([ComponentType.orelse, ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) &&
                    activeNode.getText().isSet())
            }/>
            }
        </CommonEditorTable>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

export default connect(
    mapStateToProps,
    null
)(ComponentEditor);

