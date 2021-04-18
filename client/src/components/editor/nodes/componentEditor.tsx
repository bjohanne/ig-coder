import React from "react";
import {connect} from "react-redux";
import CommonEditorTable from "../common/commonTable";
import ComponentChildren from "../children/componentChildren";
import TextContentComponent from "../common/textContent";
import {Entry} from "../../../core/model/entry";
import {ComponentNode} from "../../../core/model/nodes";
import {ComponentType, NodeType} from "../../../core/model/enums";
import ViewStatementText from "../common/viewStatementText";

interface IProps {
    currentEntry: Entry,
    activeNode: ComponentNode
}

const ComponentEditor = (props: IProps) => {
    const {currentEntry, activeNode} = props;

    // A Component node cannot have text content under the following conditions:
    const textContentDisabled: boolean =
        ([ComponentType.orelse, ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) &&
            activeNode.children.length > 0) ||
        ([ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject,
            ComponentType.constitutingproperties, ComponentType.constitutedentity].includes(activeNode.componentType) &&
        activeNode.children.length > 0 && ![NodeType.property, NodeType.propertyjunction].includes(activeNode.children[0].nodeType));

    // A Component node cannot have children under the following conditions (NB: Or Else not included):
    const childrenDisabled: boolean =
        !!([ComponentType.aim, ComponentType.constitutivefunction].includes(activeNode.componentType) &&
        activeNode.getText().isSet());

    return (
        <CommonEditorTable key={activeNode.id}>
            {/* An ActConds/ExeCstrts Component node can never have text content. */}
            {/* NB: Text content has also been disabled for the Or Else type.
                The rest of codebase still treats Or Else as able to have text content! */}
            {![ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse]
                .includes(activeNode.componentType) ?
            <TextContentComponent currentEntry={currentEntry} disabled={textContentDisabled}/>
            :
            <ViewStatementText currentEntry={currentEntry} className="pb-2"/>
            }
            {![ComponentType.deontic, ComponentType.modal, ComponentType.simplecontext].includes(activeNode.componentType) &&
            <hr className="pb-2"/>
            }
            {/* The following 3 component types can never have children: */}
            {![ComponentType.deontic, ComponentType.modal, ComponentType.simplecontext].includes(activeNode.componentType) &&
            <ComponentChildren disabled={childrenDisabled}/>
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

