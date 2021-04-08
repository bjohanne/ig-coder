import {Middleware, MiddlewareAPI} from "redux";
import {
    CLEAR_TREE,
    CLEAR_TREE_RESPONSE,
    CREATE_ROOT_NODE,
    CREATE_ROOT_NODE_RESPONSE,
    SET_REPHRASED,
    SET_REPHRASED_RESPONSE,
    UNSET_REPHRASED,
    UNSET_REPHRASED_RESPONSE,
    SET_CONTEXT_TYPE,
    SET_CONTEXT_TYPE_RESPONSE,
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
    UNSET_TEXT_CONTENT,
    UNSET_TEXT_CONTENT_RESPONSE,
    SET_JUNCTION_TYPE,
    SET_JUNCTION_TYPE_RESPONSE,
    UNSET_JUNCTION_TYPE,
    UNSET_JUNCTION_TYPE_RESPONSE
} from "./actions";
import {Entry} from "../../core/model/entry";
import {INode} from "../../core/model/interfaces";
import {NodeType} from "../../core/model/enums";
import {
    ComponentJunctionNode,
    ComponentNode,
    PropertyJunctionNode,
    PropertyNode,
    StatementJunctionNode
} from "../../core/model/nodes";

export const modelMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    let entryCopy: Entry;
    let node: INode | undefined;
    switch (action.type) {
        case CREATE_ROOT_NODE:
            // Make a deep copy of the current entry (necessary because state is immutable)
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            // Make the change
            entryCopy.createRoot(action.nodeType);
            // Dispatch an action to send the updated entry to the reducer
            store.dispatch({
                type: CREATE_ROOT_NODE_RESPONSE,
                entryIndex: action.entryIndex,
                newEntry: entryCopy
            });
            break;
        case CLEAR_TREE:
            store.dispatch({
                type: CLEAR_TREE_RESPONSE,
                entryIndex: action.entryIndex
            });
            break;
        case SET_REPHRASED:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            entryCopy.setRephrased(action.rephrased);
            store.dispatch({
                type: SET_REPHRASED_RESPONSE,
                entryIndex: action.entryIndex,
                newEntry: entryCopy
            });
            break;
        case UNSET_REPHRASED:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            entryCopy.unsetRephrased();
            store.dispatch({
                type: UNSET_REPHRASED_RESPONSE,
                entryIndex: action.entryIndex,
                newEntry: entryCopy
            });
            break;
        case TURN_NEGATION_ON:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.turnNegationOn();
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: TURN_NEGATION_ON_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        case TURN_NEGATION_OFF:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.turnNegationOff();
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: TURN_NEGATION_OFF_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
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
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: TURN_FUNCDEP_ON_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        case TURN_FUNCDEP_OFF:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.property, NodeType.propertyjunction].includes(node.nodeType)) {
                    (node as PropertyNode | PropertyJunctionNode).makeNotFunctionallyDependent();
                }
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: TURN_FUNCDEP_OFF_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        case SET_CONTEXT_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.setContextType(action.contextType);
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: SET_CONTEXT_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        case UNSET_CONTEXT_TYPE:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                node.unsetContextType();
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: UNSET_CONTEXT_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
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
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: SET_JUNCTION_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
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
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: UNSET_JUNCTION_TYPE_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
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
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: SET_TEXT_CONTENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        case UNSET_TEXT_CONTENT:
            entryCopy = Entry.fromData(store.getState().documents.currentDocument.entries[action.entryIndex]);
            try {
                node = entryCopy.find(action.nodeId);
                if ([NodeType.component, NodeType.property, NodeType.propertyjunction,
                    NodeType.componentjunction, NodeType.statementjunction].includes(node.nodeType)) {
                    (node as ComponentNode | PropertyNode | PropertyJunctionNode | ComponentJunctionNode | StatementJunctionNode)
                        .unsetText();
                }
            } catch (e) {
                console.error(e);
            } finally {
                store.dispatch({
                    type: UNSET_TEXT_CONTENT_RESPONSE,
                    entryIndex: action.entryIndex,
                    newEntry: entryCopy
                });
            }
            break;
        default:
            break;
    }
    next(action);
}