import update from 'immutability-helper';
import Document from "../core/model/document";
import {
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY
} from "./actionTypes";
import { INode, INormAndConvention } from '../core/model/interfaces';
import { Arg } from '../core/model/enums';

interface IInitialState {
    documents: Array<Document>,
	currentDocument: Document | null
}

const initialState: IInitialState = {
    documents: [],
	currentDocument: null
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_DOCUMENT_RESPONSE:
			// Here, we could check whether the existing currentDocument is identical to the new one.
			// But maybe such a comparison is expensive, and we might as well just always overwrite.
            return update(state, {currentDocument: {$set: action.payload}});
        case ADD_ENTRY_TO_DOCUMENT:
            if(state.currentDocument.forest.length === 0) { 
                let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id);
                doc.createTree(action.payload.hasDeontic, action.payload.content);             
                return update(state, { currentDocument: { $set: doc }});
            } else {
                return state;
            }
        case SET_ACTIVE_NODE:
            console.log("SET_ACTIVE_NODE", action.payload);
            return update(state, { activeNode: { $set: action.payload }});
    
        case CREATE_DOCUMENT_RESPONSE:
			let document = new Document(action.payload.name, action.payload.description, action.payload.id);
            return update(state, {documents: {$push: [document]}, currentDocument: {$set: document}});
        case UPDATE_ENTRY:
            state.currentDocument.updateNode(action.payload);
            let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id, state.currentDocument.forest);            
            return update(state, {currentDocument: { $set: doc } });
        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.
			// NB: This shouldn't happen on page navigation. For now, I'm writing this as if we were using proper single-page app navigation.

            if (!action.payload) {
                return state;
            }

			let dlist = action.payload.reducer.documents;
			if (!dlist) {
				dlist = [];	// If it's null/undefined, we want it to be an empty array
			}
            let d = action.payload.reducer.currentDocument;
	        let rebuiltDoc;
			if (d) {
				rebuiltDoc = new Document(d.name, d.description, d.id, d.forest);
			}

			// Rehydrate both the list of documents and the current document
		    return update(state, {documents: {$set: dlist}, currentDocument: { $set: rebuiltDoc }})
        default:
            console.log("No action was hit", action);
            return state;
    }
};

export default reducer;
