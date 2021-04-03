import {Middleware, MiddlewareAPI} from "redux";
import {
    CREATE_ROOT_NODE,
    CREATE_ROOT_NODE_RESPONSE,
    CLEAR_TREE,
    CLEAR_TREE_RESPONSE
} from "./actions";
import {Entry} from "../../core/model/entry";

export const modelMiddleware: Middleware = (store: MiddlewareAPI) => (next: any) => (action: any) => {
    let entryCopy: Entry;
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
        default:
            break;
    }
    next(action);
}