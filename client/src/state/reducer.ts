import update from 'immutability-helper';
import Document from "../core/model/document";
import {
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE
} from "./actionTypes";
import { INode } from '../core/model/interfaces';

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
                doc.createTree(action.payload.content, action.payload.hasDeontic);             
                return update(state, { currentDocument: { $set: doc }});
            } else {
                return state;
            }
        case SET_ACTIVE_NODE:
            console.log("SET_ACTIVE_NODE", action.payload)
            return update(state, { activeNode: { $set: action.payload }});
    
        case CREATE_DOCUMENT_RESPONSE:
			return update(state, {documents: {$push: [action.payload]}, currentDocument: {$set: action.payload}});
        default:
            return state;
    }
};

export default reducer;
