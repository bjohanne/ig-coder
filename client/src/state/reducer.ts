import update from 'immutability-helper';
import Document from "../core/model/document";
import {
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE
} from "./actionTypes";

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
        case CREATE_DOCUMENT_RESPONSE:
			return update(state, {documents: {$push: [action.payload]}, currentDocument: {$set: action.payload}});
        default:
            return state;
    }
};

export default reducer;
