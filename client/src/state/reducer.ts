import update from 'immutability-helper';
import Document from "../core/model/document";
import {
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY,
    ADD_JUNCTION
} from "./actionTypes";

import { NormNode, SanctionNode, JunctionNode, ComponentNode, SubcomponentNode } from '../core/model/nodes';
import { Arg, SubcomponentType, JunctionType } from '../core/model/enums';
import { INode } from '../core/model/interfaces';

interface IInitialState {
    documents: Array<Document>,
    currentDocument: Document | null
    activeNode: any
}

const initialState: IInitialState = {
    documents: [],
    currentDocument: null,
    activeNode: null
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case GET_DOCUMENT_RESPONSE:
			// Here, we could check whether the existing currentDocument is identical to the new one.
			// But maybe such a comparison is expensive, and we might as well just always overwrite.
            return update(state, {currentDocument: {$set: action.payload}});
        case ADD_JUNCTION:
            let node = action.payload as INode;
            let currentDocument = state.currentDocument as Document;
            currentDocument.forest[0].updatedAt = new Date();
            currentDocument.updateNode(node);
            let newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});

            
        case ADD_ENTRY_TO_DOCUMENT:
            if(state.currentDocument.forest.length === 0) { // NB: Change this when allowing multiple entries per document
                let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id);
                doc.createTree(action.payload.hasDeontic, action.payload.content);

				// Below is development stuff - building an example tree to demonstrate the different node types
				doc.addSanctionNodeToTree(0);
				let root = doc.getRoot() as SanctionNode;
				let norm = root.getLeft() as NormNode;	// Actually a Convention node, maybe
				doc.turnOnNegation(norm, 0);
				norm.setEntry("The Program Manager may not initiate suspension or revocation proceedings against a certified operation.");
				norm.createObject();
				let attr = norm.getAttributes() as ComponentNode;
				attr.setContent("Program Manager", "The");
				let obj = norm.getObject() as ComponentNode;
				let dirObj = obj.getLeft() as SubcomponentNode;
				dirObj.createJunctionNode();
				let jun = dirObj.getChild() as JunctionNode;
				jun.setJunction(JunctionType.xor);
				jun.createSubcomponentNode(SubcomponentType.direct, Arg.left);
				jun.createSubcomponentNode(SubcomponentType.direct, Arg.right);
				let left = jun.getLeft() as SubcomponentNode;
				left.setContent("suspension");
				let right = jun.getRight() as SubcomponentNode;
				right.setContent("revocation proceedings");
				let indirObj = obj.getRight() as SubcomponentNode;
				indirObj.createSubcomponentNode(SubcomponentType.indirect, Arg.only);
				let only = indirObj.getChild() as SubcomponentNode;
				only.setContent("a certified operation");
				let aim = norm.getAim() as ComponentNode;
				aim.setContent("initiate");
				// End dev stuff

                return update(state, { currentDocument: { $set: doc }});
            } else {
                return state;
            }
        case SET_ACTIVE_NODE:            
            return update(state, { activeNode: { $set: action.payload }});    
        case CREATE_DOCUMENT_RESPONSE:
			let document = new Document(action.payload.name, action.payload.description, action.payload.id);
            return update(state, {documents: {$push: [document]}, currentDocument: {$set: document}});
        case UPDATE_ENTRY:            
            state.currentDocument.updateNode(action.payload);
            let nDoc = Object.assign(new Document("", "", -1), state.currentDocument);            
            return update(state, {currentDocument: { $set: nDoc } });
        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.

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
            return state;
    }
};

export default reducer;
