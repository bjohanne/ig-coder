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
            console.log("SET_ACTIVE_NODE", action.payload)
            return update(state, { activeNode: { $set: action.payload }});
    
        case CREATE_DOCUMENT_RESPONSE:
            return update(state, {documents: {$push: [action.payload]}, currentDocument: {$set: new Document(action.payload.name, action.payload.description, action.payload.id)}});
        case UPDATE_ENTRY:
            state.currentDocument.updateNode(action.payload);
            let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id, state.currentDocument.forest);            
            return update(state, {currentDocument: { $set: doc } });
        case "persist/REHYDRATE":
            let d = action.payload.reducer.currentDocument;
            let rebuiltDoc = new Document(d.name, d.description, d.id, d.forest);
            return update(state, {currentDocument: { $set: rebuiltDoc }})
        default:
            console.log("Unfortunately, no action was being hit", action);
            return state;
    }
};

export default reducer;
