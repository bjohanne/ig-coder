import update from 'immutability-helper';
import {AxiosError} from "axios";
import {
    SET_SAVED,
    SET_ENTRY_INDEX,
    GET_DOCUMENT_RESPONSE,
    GET_DOCUMENT_RESPONSE_FETCHED,
    CREATE_DOCUMENT_RESPONSE_THEN,
    LOAD_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY,
    ADD_JUNCTION,
    UPDATE_JUNCTION,
    UPDATE_NEGATION
} from "./actions";

import {
    CREATE_ROOT_NODE_RESPONSE,
    CLEAR_TREE_RESPONSE,
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
import {testDocumentVideo} from "../../core/config/testDocumentVideo";
import {RegulativeStatementNode, JunctionNode} from '../../core/model/nodes';
import {Arg} from '../../core/model/enums';
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
    currentDocument: testDocumentVideo, // NB: Test document set as default regardless of whether management mode is on! Should be null if on.
    currentEntryIndex: null,
    activeNode: null,
    changed: false,
    loading: false,
    error: null
};

const documents = (state: IDocumentState = initialState, action: any) => {
    let currentDocument: Document;
    let newDocument: Document;
    let node: INode;
    switch (action.type) {

        // API_CALL

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

        // DOCUMENT

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

        /* OLD */
        case ADD_JUNCTION:
            node = action.payload as INode;
            currentDocument = state.currentDocument as Document;
            currentDocument.entries[0].root.updatedAt = new Date();
            currentDocument.replaceNode(node);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});
        case UPDATE_JUNCTION:
            let junctionNode = action.payload.node as JunctionNode;
            currentDocument = state.currentDocument as Document;
            currentDocument.entries[0].root.updatedAt = new Date();
            junctionNode.setJunctionType(action.payload.junctionType);
            currentDocument.replaceNode(junctionNode);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});
        case UPDATE_NEGATION:
            let negationNode = action.payload.node;
            currentDocument = state.currentDocument as Document;
            currentDocument.entries[0].root.updatedAt = new Date();
            currentDocument.replaceNode(negationNode);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});
        case ADD_ENTRY_TO_DOCUMENT:
            if(state.currentDocument.entries.length >= 0) { // Not sure why this check is necessary
                let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id);
                let entry = doc.createEntry();
                let root = entry.createRoot(Arg.regulative, action.payload.content) as RegulativeStatementNode;
				root.createDirectObject();
				return update(state, { currentDocument: { $set: doc }});
			} else {
				return state;
			}
        case UPDATE_ENTRY:
            state.currentDocument.replaceNode(action.payload);
            let nDoc = Object.assign(new Document("", "", -1), state.currentDocument);
            return update(state, {currentDocument: { $set: nDoc } });

        // MODEL

        // All reducers for model actions just overwrite the correct Entry with an updated one. They also set changed to true.
        case CREATE_ROOT_NODE_RESPONSE:
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
        case CLEAR_TREE_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            root: {
                                $set: undefined
                            }
                        }
                    }
                },
                changed: { $set: true }
            });
        case SET_REPHRASED_RESPONSE:
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
        case UNSET_REPHRASED_RESPONSE:
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
        case TURN_NEGATION_ON_RESPONSE:
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
        case TURN_NEGATION_OFF_RESPONSE:
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
        case TURN_FUNCDEP_ON_RESPONSE:
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
        case TURN_FUNCDEP_OFF_RESPONSE:
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
        case SET_CONTEXT_TYPE_RESPONSE:
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
        case UNSET_CONTEXT_TYPE_RESPONSE:
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
        case SET_TEXT_CONTENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newNode },
                changed: { $set: true }
            });
        case UNSET_TEXT_CONTENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newNode },
                changed: { $set: true }
            });
        case SET_JUNCTION_TYPE_RESPONSE:
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
        /* ---------------------Children--------------------- */
        // Add
        case ADD_CHILD_TO_STATEMENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case ADD_CHILD_TO_COMPONENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case ADD_CHILD_TO_JUNCTION_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case ADD_CHILD_TO_PROPERTY_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        // Delete
        case DELETE_CHILD_FROM_STATEMENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case DELETE_CHILD_FROM_COMPONENT_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case DELETE_CHILD_FROM_JUNCTION_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });
        case DELETE_CHILD_FROM_PROPERTY_RESPONSE:
            return update(state, {
                currentDocument: {
                    entries: {
                        [action.entryIndex]: {
                            $set: action.newEntry
                        }
                    }
                },
                activeNode: { $set: action.newParentNode },
                changed: { $set: true }
            });

        // OTHER

        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.

            if (action.key !== "documents") {
                return state;
            }
            if (!action.payload) {
                return state;
            }
			// Rehydrate documents array
			let origList = action.payload.documentList;
			let dlist = [];
			if (origList && origList.length > 0) {
				origList.forEach((d: IDocument) => {
					dlist.push(Document.fromData(d));
				});
			}

			// Rehydrate current document
            let d: IDocument = action.payload.currentDocument;
	        let rebuiltDoc;
			if (d) {
				rebuiltDoc = Document.fromData(d);
			}
		    return update(state, {documentList: {$set: dlist}, currentDocument: { $set: rebuiltDoc }})

        default:
            return state;
    }
};

export default documents;
