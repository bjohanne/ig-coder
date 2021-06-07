import update from 'immutability-helper';
import {AxiosError} from "axios";
import {
    SET_SAVED,
    SET_ENTRY_INDEX,
    GET_DOCUMENT_RESPONSE,
    GET_DOCUMENT_RESPONSE_FETCHED,
    CREATE_DOCUMENT_RESPONSE_THEN,
    LOAD_DOCUMENT_RESPONSE,
    SET_ACTIVE_NODE
} from "./actions";

import {
    CREATE_ROOT_NODE_RESPONSE,
    CLEAR_TREE_RESPONSE,
    COMPLETE_CODING_RESPONSE,
    SET_REPHRASED_RESPONSE,
    UNSET_REPHRASED_RESPONSE,
    TURN_NEGATION_ON_RESPONSE,
    TURN_NEGATION_OFF_RESPONSE,
    TURN_FUNCDEP_ON_RESPONSE,
    TURN_FUNCDEP_OFF_RESPONSE,
    SET_CONTEXT_TYPE_RESPONSE,
    UNSET_CONTEXT_TYPE_RESPONSE,
    SET_TEXT_CONTENT_RESPONSE,
    UNSET_TEXT_CONTENT_RESPONSE,
    SET_JUNCTION_TYPE_RESPONSE,
    SET_PROPERTY_TYPE_RESPONSE,
    ADD_CHILD_TO_STATEMENT_RESPONSE,
    ADD_CHILD_TO_COMPONENT_RESPONSE,
    ADD_CHILD_TO_JUNCTION_RESPONSE,
    ADD_CHILD_TO_PROPERTY_RESPONSE,
    DELETE_CHILD_FROM_STATEMENT_RESPONSE,
    DELETE_CHILD_FROM_COMPONENT_RESPONSE,
    DELETE_CHILD_FROM_JUNCTION_RESPONSE,
    DELETE_CHILD_FROM_PROPERTY_RESPONSE
} from "../model/actions";

import {API_CALL_BEGIN, API_CALL_SUCCESS, API_CALL_ERROR} from "../apiCall/actions";

import Document from "../../core/model/document";
import {testDocument} from "../../core/config/testDocument";
import {IDocument, INode} from '../../core/model/interfaces';

interface IDocumentState {
    // Full list of all documents in memory
    documentList: Array<Document>,
    // The document that's currently being viewed
    currentDocument: Document | null,
    // The index of the entry that's currently being viewed
    currentEntryIndex: Number,
    // The node for which the editor modal is currently open
    activeNode: INode,
    // Whether the document has changed since last save
    changed: Boolean,
    // Whether an API request is currently being processed
    loading: Boolean,
    // The error object for the last API error that occurred
    error: AxiosError
}

const initialState: IDocumentState = {
    documentList: [],
    currentDocument: testDocument, // NB: Test document set as default regardless of whether management mode is on! Should be null if on.
    currentEntryIndex: null,
    activeNode: null,
    changed: false,
    loading: false,
    error: null
};

const documents = (state: IDocumentState = initialState, action: any) => {
    switch (action.type) {

        // API_CALL ACTIONS

        case API_CALL_BEGIN:
            return update(state, {
                loading: {$set: true},
                error: {$set: null}
            });
        case API_CALL_SUCCESS:
            return update(state, {
                loading: {$set: false},
                error: {$set: null}
            });
        case API_CALL_ERROR:
            return update(state, {
                loading: {$set: false},
                error: {$set: action.error}
            });

        // DOCUMENT ACTIONS

        case SET_SAVED:
            return update(state, {changed: {$set: false}});
        case SET_ENTRY_INDEX:
            return update(state, {currentEntryIndex: {$set: action.payload}});
        case GET_DOCUMENT_RESPONSE:
            return update(state, {currentDocument: {$set: action.payload}});
        case GET_DOCUMENT_RESPONSE_FETCHED:
            return update(state, {documentList: {$push: [action.payload]}, currentDocument: {$set: action.payload}});
        case CREATE_DOCUMENT_RESPONSE_THEN:
            return update(state, {
                documentList: {$push: [action.payload]},
                currentDocument: {$set: action.payload},
                changed: { $set: true }
            });
        case LOAD_DOCUMENT_RESPONSE:    // NB: This does not currently update documentList - it should do so in the future.
            return update(state, {
                currentDocument: {$set: action.payload},
                loading: { $set: false }
            });
        case SET_ACTIVE_NODE:
            return update(state, {activeNode: {$set: action.payload}});

        // MODEL ACTIONS

        // All reducers for model actions just overwrite the correct Entry with an updated one passed in the action.
        // They also set changed to true.
        case CREATE_ROOT_NODE_RESPONSE: // All the following reducers perform the exact same code
            /* falls through */
        case CLEAR_TREE_RESPONSE:
            /* falls through */
        case COMPLETE_CODING_RESPONSE:
            /* falls through */
        case SET_REPHRASED_RESPONSE:
            /* falls through */
        case UNSET_REPHRASED_RESPONSE:
            /* falls through */
        case TURN_NEGATION_ON_RESPONSE:
            /* falls through */
        case TURN_NEGATION_OFF_RESPONSE:
            /* falls through */
        case TURN_FUNCDEP_ON_RESPONSE:
            /* falls through */
        case TURN_FUNCDEP_OFF_RESPONSE:
            /* falls through */
        case SET_CONTEXT_TYPE_RESPONSE:
            /* falls through */
        case UNSET_CONTEXT_TYPE_RESPONSE:
            /* falls through */
        case SET_JUNCTION_TYPE_RESPONSE:
            /* falls through */
        case SET_PROPERTY_TYPE_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                changed: { $set: true }
            });

        /* Reducers that update activeNode */
        case SET_TEXT_CONTENT_RESPONSE:     // These reducers run the same code, slightly different from the above
            /* falls through */
        case UNSET_TEXT_CONTENT_RESPONSE:
            /* falls through */
        case ADD_CHILD_TO_STATEMENT_RESPONSE:
            /* falls through */
        case ADD_CHILD_TO_COMPONENT_RESPONSE:
            /* falls through */
        case ADD_CHILD_TO_JUNCTION_RESPONSE:
            /* falls through */
        case ADD_CHILD_TO_PROPERTY_RESPONSE:
            /* falls through */
        case DELETE_CHILD_FROM_STATEMENT_RESPONSE:
            /* falls through */
        case DELETE_CHILD_FROM_COMPONENT_RESPONSE:
            /* falls through */
        case DELETE_CHILD_FROM_JUNCTION_RESPONSE:
            /* falls through */
        case DELETE_CHILD_FROM_PROPERTY_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newActiveNode },
                changed: { $set: true }
            });

        // OTHER ACTIONS

        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load and refresh.

            if (action.key !== "documents") {
                return state;
            }
            if (!action.payload) {
                return state;
            }
			// Rebuild documents array
			let originalList = action.payload.documentList;
			let rebuiltList = [];
			if (originalList && originalList.length > 0) {
				originalList.forEach((d: IDocument) => {
					rebuiltList.push(Document.fromData(d));
				});
			}

			// Rebuild current document
            let d: IDocument = action.payload.currentDocument;
	        let rebuiltDoc;
			if (d) {
				rebuiltDoc = Document.fromData(d);
			}
		    return update(state, {documentList: {$set: rebuiltList}, currentDocument: { $set: rebuiltDoc }})

        default:
            return state;
    }
};

export default documents;
