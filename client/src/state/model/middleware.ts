import {Middleware, MiddlewareAPI} from "redux";
import {
    ADD_CHILD_TO_COMPONENT,
    ADD_CHILD_TO_COMPONENT_RESPONSE,
    ADD_CHILD_TO_JUNCTION,
    ADD_CHILD_TO_JUNCTION_RESPONSE,
    ADD_CHILD_TO_PROPERTY,
    ADD_CHILD_TO_PROPERTY_RESPONSE,
    ADD_CHILD_TO_STATEMENT,
    ADD_CHILD_TO_STATEMENT_RESPONSE,
    CLEAR_TREE,
    CLEAR_TREE_RESPONSE,
    CREATE_ROOT_NODE,
    CREATE_ROOT_NODE_RESPONSE,
    DELETE_CHILD_FROM_COMPONENT,
    DELETE_CHILD_FROM_COMPONENT_RESPONSE,
    DELETE_CHILD_FROM_JUNCTION,
    DELETE_CHILD_FROM_JUNCTION_RESPONSE,
    DELETE_CHILD_FROM_PROPERTY,
    DELETE_CHILD_FROM_PROPERTY_RESPONSE,
    DELETE_CHILD_FROM_STATEMENT,
    DELETE_CHILD_FROM_STATEMENT_RESPONSE,
    SET_CONTEXT_TYPE,
    SET_CONTEXT_TYPE_RESPONSE,
    SET_JUNCTION_TYPE,
    SET_JUNCTION_TYPE_RESPONSE,
    SET_REPHRASED,
    SET_REPHRASED_RESPONSE,
    SET_TEXT_CONTENT,
    SET_TEXT_CONTENT_RESPONSE,
    TURN_FUNCDEP_OFF,
    TURN_FUNCDEP_OFF_RESPONSE,
    TURN_FUNCDEP_ON,
    TURN_FUNCDEP_ON_RESPONSE,
    TURN_NEGATION_OFF,
    TURN_NEGATION_OFF_RESPONSE,
    TURN_NEGATION_ON,
    TURN_NEGATION_ON_RESPONSE,
    UNSET_CONTEXT_TYPE,
    UNSET_CONTEXT_TYPE_RESPONSE,
    UNSET_JUNCTION_TYPE,
    UNSET_JUNCTION_TYPE_RESPONSE,
    UNSET_REPHRASED,
    UNSET_REPHRASED_RESPONSE,
    UNSET_TEXT_CONTENT,
    UNSET_TEXT_CONTENT_RESPONSE
} from "./actions";
import {Entry} from "../../core/model/entry";
import {INode} from "../../core/model/interfaces";
import {Arg, ComponentType, NodeType} from "../../core/model/enums";
import {
    ComponentJunctionNode,
    ComponentNode,
    ConstitutiveStatementNode, JunctionNode,
    PropertyJunctionNode,
    PropertyNode,
    RegulativeStatementNode,
    StatementJunctionNode
} from "../../core/model/nodes";

export const modelMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    let entryCopy: Entry;
    let node: INode | undefined;
    switch (action.type) {
        case CREATE_ROOT_NODE:
            // Steps of all model middlewares:
            // 1. Make a deep copy of the current entry (necessary because state is immutable)
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            // 2. Make the change
            entryCopy.createRoot(action.nodeType);
            // 3. Dispatch an action to send the updated entry to the reducer
            store.dispatch({
                type: CREATE_ROOT_NODE_RESPONSE,
                entryIndex: action.entryIndex,
                newEntry: entryCopy
            });
            break;
        case CLEAR_TREE:
            // No changes to make, just signal that the tree is to be deleted
            store.dispatch({
                type: CLEAR_TREE_RESPONSE,
                entryIndex: action.entryIndex
            });
            break;
        case SET_REPHRASED:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                entryCopy.setRephrased(action.rephrased);
                store.dispatch({
                    type: SET_REPHRASED_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case UNSET_REPHRASED:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                entryCopy.unsetRephrased();
                store.dispatch({
                    type: UNSET_REPHRASED_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case TURN_NEGATION_ON:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.turnNegationOn();
                store.dispatch({
                    type: TURN_NEGATION_ON_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case TURN_NEGATION_OFF:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.turnNegationOff();
                store.dispatch({
                    type: TURN_NEGATION_OFF_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case TURN_FUNCDEP_ON:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.property, NodeType.propertyjunction].includes(node.nodeType)) {
                    (node as PropertyNode | PropertyJunctionNode).makeFunctionallyDependent();
                    // Note that elevateFunctionallyDependent() is not called since we don't have access to this
                    // node's ancestor Component node. Users will have to do that manually.
                }
                store.dispatch({
                    type: TURN_FUNCDEP_ON_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case TURN_FUNCDEP_OFF:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.property, NodeType.propertyjunction].includes(node.nodeType)) {
                    (node as PropertyNode | PropertyJunctionNode).makeNotFunctionallyDependent();
                }
                store.dispatch({
                    type: TURN_FUNCDEP_OFF_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case SET_CONTEXT_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.setContextType(action.contextType);
                store.dispatch({
                    type: SET_CONTEXT_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case UNSET_CONTEXT_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.unsetContextType();
                store.dispatch({
                    type: UNSET_CONTEXT_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case SET_JUNCTION_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.statementjunction, NodeType.componentjunction, NodeType.propertyjunction].includes(node.nodeType)) {
                    (node as StatementJunctionNode | ComponentJunctionNode | PropertyJunctionNode)
                        .setJunctionType(action.junctionType);
                }
                store.dispatch({
                    type: SET_JUNCTION_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case UNSET_JUNCTION_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.statementjunction, NodeType.componentjunction, NodeType.propertyjunction].includes(node.nodeType)) {
                    (node as StatementJunctionNode | ComponentJunctionNode | PropertyJunctionNode)
                        .unsetJunctionType();
                }
                store.dispatch({
                    type: UNSET_JUNCTION_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case SET_TEXT_CONTENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.component, NodeType.property, NodeType.propertyjunction,
                NodeType.componentjunction, NodeType.statementjunction].includes(node.nodeType)) {
                    (node as ComponentNode | PropertyNode | PropertyJunctionNode | ComponentJunctionNode | StatementJunctionNode)
                        .getText().setFromData(action.textContent);
                }
                store.dispatch({
                    type: SET_TEXT_CONTENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case UNSET_TEXT_CONTENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                (node as ComponentNode | PropertyNode | PropertyJunctionNode | ComponentJunctionNode | StatementJunctionNode)
                    .unsetText();
                store.dispatch({
                    type: UNSET_TEXT_CONTENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;

        /* ---------------------Children--------------------- */
        // Add

        case ADD_CHILD_TO_STATEMENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                if (node.nodeType === NodeType.regulativestatement) {
                    switch (Number(action.childIndex)) {
                        case Arg.reg_deontic:
                            (node as RegulativeStatementNode).createDeontic();
                            break;
                        case Arg.reg_directobject:
                            (node as RegulativeStatementNode).createDirectObject();
                            break;
                        case Arg.reg_indirectobject:
                            (node as RegulativeStatementNode).createIndirectObject();
                            break;
                        case Arg.reg_orelse:
                            (node as RegulativeStatementNode).createOrElse();
                            break;
                        default:
                    }
                } else if (node.nodeType === NodeType.constitutivestatement) {
                    switch (Number(action.childIndex)) {
                        case Arg.con_modal:
                            (node as ConstitutiveStatementNode).createModal();
                            break;
                        case Arg.con_constitutingproperties:
                            (node as ConstitutiveStatementNode).createConstitutingProperties();
                            break;
                        case Arg.con_orelse:
                            (node as ConstitutiveStatementNode).createOrElse();
                            break;
                        default:
                    }
                } else {
                    console.error("Called addChildToStatement on a node that was not a Statement node");
                }
                store.dispatch({
                    type: ADD_CHILD_TO_STATEMENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case ADD_CHILD_TO_COMPONENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                switch (action.childType) {
                    case NodeType.regulativestatement:
                        (node as ComponentNode).createStatementNode(Arg.regulative);
                        break;
                    case NodeType.constitutivestatement:
                        (node as ComponentNode).createStatementNode(Arg.constitutive);
                        break;
                    case NodeType.statementjunction:
                        (node as ComponentNode).createStatementJunctionNode();
                        break;
                    case NodeType.componentjunction:
                        (node as ComponentNode).createComponentJunctionNode();
                        break;
                    case NodeType.propertyjunction:
                        (node as ComponentNode).createPropertyJunctionNode();
                        break;
                    case NodeType.component:
                        let componentType: ComponentType = (node as ComponentNode).componentType;
                        if ([ComponentType.activationconditions, ComponentType.executionconstraints]
                            .includes(componentType)) {
                            componentType = ComponentType.simplecontext;
                        }
                        (node as ComponentNode).createComponentNode(componentType);
                        break;
                    case NodeType.property:
                        (node as ComponentNode).createPropertyNode();
                        break;
                    default:
                }
                store.dispatch({
                    type: ADD_CHILD_TO_COMPONENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case ADD_CHILD_TO_JUNCTION:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                switch (action.childType) {
                    case NodeType.regulativestatement:
                        (node as StatementJunctionNode).createStatementNode(Arg.regulative, action.childIndex);
                        break;
                    case NodeType.constitutivestatement:
                        (node as StatementJunctionNode).createStatementNode(Arg.constitutive, action.childIndex);
                        break;
                    case NodeType.statementjunction:
                        (node as StatementJunctionNode).createStatementJunctionNode(action.childIndex);
                        break;
                    case NodeType.componentjunction:
                        (node as ComponentJunctionNode).createComponentJunctionNode(action.childIndex);
                        break;
                    case NodeType.component:
                        let componentType: ComponentType = (node as ComponentNode).componentType;
                        if ([ComponentType.activationconditions, ComponentType.executionconstraints]
                            .includes(componentType)) {
                            componentType = ComponentType.simplecontext;
                        }
                        (node as ComponentJunctionNode).createComponentNode(componentType, action.childIndex);
                        break;
                    case NodeType.propertyjunction:
                        (node as PropertyJunctionNode).createPropertyJunctionNode(action.childIndex);
                        break;
                    case NodeType.property:
                        (node as PropertyJunctionNode).createPropertyNode(action.childIndex);
                        break;
                    default:
                }
                store.dispatch({
                    type: ADD_CHILD_TO_JUNCTION_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case ADD_CHILD_TO_PROPERTY:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                switch (action.childType) {
                    case NodeType.regulativestatement:
                        (node as PropertyNode).createStatementNode(Arg.regulative);
                        break;
                    case NodeType.constitutivestatement:
                        (node as PropertyNode).createStatementNode(Arg.constitutive);
                        break;
                    case NodeType.statementjunction:
                        (node as PropertyNode).createStatementJunctionNode();
                        break;
                    case NodeType.propertyjunction:
                        (node as PropertyNode).createPropertyJunctionNode();
                        break;
                    case NodeType.property:
                        (node as PropertyNode).createPropertyNode();
                        break;
                    default:
                }
                store.dispatch({
                    type: ADD_CHILD_TO_PROPERTY_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;

            // Delete
        case DELETE_CHILD_FROM_STATEMENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                if (node.nodeType === NodeType.regulativestatement) {
                    switch (Number(action.childIndex)) {
                        case Arg.reg_deontic:
                            (node as RegulativeStatementNode).deleteDeontic();
                            break;
                        case Arg.reg_directobject:
                            (node as RegulativeStatementNode).deleteDirectObject();
                            break;
                        case Arg.reg_indirectobject:
                            (node as RegulativeStatementNode).deleteIndirectObject();
                            break;
                        case Arg.reg_orelse:
                            (node as RegulativeStatementNode).deleteOrElse();
                            break;
                        default:
                    }
                } else if (node.nodeType === NodeType.constitutivestatement) {
                    switch (Number(action.childIndex)) {
                        case Arg.con_modal:
                            (node as ConstitutiveStatementNode).deleteModal();
                            break;
                        case Arg.con_constitutingproperties:
                            (node as ConstitutiveStatementNode).deleteConstitutingProperties();
                            break;
                        case Arg.con_orelse:
                            (node as ConstitutiveStatementNode).deleteOrElse();
                            break;
                        default:
                    }
                } else {
                    console.error("Called deleteChildFromStatement on a node that was not a Statement node");
                }
                store.dispatch({
                    type: DELETE_CHILD_FROM_STATEMENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case DELETE_CHILD_FROM_COMPONENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                (node as ComponentNode).deleteChild(action.childIndex);
                store.dispatch({
                    type: DELETE_CHILD_FROM_COMPONENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case DELETE_CHILD_FROM_JUNCTION:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                if (Number(action.childIndex) === Arg.left) {
                    (node as JunctionNode).deleteLeft();
                } else if (Number(action.childIndex) === Arg.right) {
                    (node as JunctionNode).deleteRight();
                }
                store.dispatch({
                    type: DELETE_CHILD_FROM_JUNCTION_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        case DELETE_CHILD_FROM_PROPERTY:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.parentId);
                (node as PropertyNode).deleteChild();
                store.dispatch({
                    type: DELETE_CHILD_FROM_PROPERTY_RESPONSE,
                    entryIndex: action.entryIndex,
                    newParentNode: node,
                    newEntry: entryCopy
                });
            } catch (e) {
                console.error(e);
            }
            break;
        default:
            break;
    }
    next(action);
}