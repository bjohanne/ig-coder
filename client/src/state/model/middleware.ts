import {Middleware, MiddlewareAPI} from "redux";
import {
    CREATE_ROOT_NODE,
    CREATE_ROOT_NODE_RESPONSE,
    CLEAR_TREE,
    CLEAR_TREE_RESPONSE,
    TURN_NEGATION_ON,
    TURN_NEGATION_ON_RESPONSE,
    TURN_NEGATION_OFF,
    TURN_NEGATION_OFF_RESPONSE,
    SET_CONTEXT_TYPE,
    SET_CONTEXT_TYPE_RESPONSE,
    UNSET_CONTEXT_TYPE,
    UNSET_CONTEXT_TYPE_RESPONSE
} from "./actions";
import {Entry} from "../../core/model/entry";
import {INode} from "../../core/model/interfaces";

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
        default:
            break;
    }
    next(action);
}